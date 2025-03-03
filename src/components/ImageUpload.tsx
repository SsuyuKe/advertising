import { useDropzone } from 'react-dropzone'
import Button from '@/components/Button'
import Input from '@/components/Input'
import Image from 'next/image'
import { Cropper, CropperRef } from 'react-advanced-cropper'
import 'react-advanced-cropper/dist/style.css'
import { uploadMaterial } from '@/api/module/material'

const ImageUpload = () => {
  const [materialName, setMaterialName] = useState('')
  const [imageSrc, setImageSrc] = useState<string | null>(null)
  const [imageName, setImageName] = useState('')
  const [imageWidth, setImageWidth] = useState<number | null>(null)
  const [imageHeight, setImageHeight] = useState<number | null>(null)
  const [croppedImage, setCroppedImage] = useState<string | null>(null)
  const [isCropping, setIsCropping] = useState(true)

  const cropperRef = useRef<CropperRef>(null)

  const onDrop = (acceptedFiles: File[]) => {
    const SIZE = 32 * 1024 * 1024
    const selectedFile = acceptedFiles[0]
    const fileSize = selectedFile.size
    if (selectedFile && selectedFile.type.startsWith('image/')) {
      if (fileSize > SIZE) {
        alert('照片大小須小於 32 MB')
        return
      }
      const reader = new FileReader()
      reader.onload = () => {
        const img = document.createElement('img')
        img.src = reader.result as string
        img.onload = () => {
          const imgWidth = img.width
          const imgHeight = img.height
          if (imgWidth > 720 || imgHeight > 1280) {
            alert('照片格式須小於 720 x 1280')
            return
          }
          setImageName(selectedFile.name)
          setImageSrc(reader.result as string)
          setImageWidth(imgWidth)
          setImageHeight(imgHeight)
          setCroppedImage(reader.result as string)
          setIsCropping(true)
        }
      }
      reader.readAsDataURL(selectedFile)
    }
  }

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
      'image/*': []
    },
    maxFiles: 1,
    maxSize: 32 * 1024 * 1024
  })

  const handleCrop = () => {
    if (cropperRef.current) {
      const canvas = cropperRef.current.getCanvas()
      if (canvas) {
        const croppedImageUrl = canvas.toDataURL()
        setCroppedImage(croppedImageUrl)
        setIsCropping(false)
      }
    }
  }

  const renderUploadArea = () => (
    <div className="bg-input rounded-6px relative cursor-pointer h-[300px]">
      {imageSrc ? (
        <div className="w-full h-full flex flex-col">
          <div className="flex-1 relative h-full">
            <Cropper
              ref={cropperRef}
              src={imageSrc}
              className="max-w-full h-full"
            />
          </div>
        </div>
      ) : (
        <div {...getRootProps()} className="w-full h-full">
          <input {...getInputProps()} />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col justify-center items-center">
            <Image src="/icons/add.svg" width={32} height={32} alt="add" />
            <p className="font-bold text-sm mt-3">請選擇檔案或拖曳素材至此</p>
          </div>
        </div>
      )}
    </div>
  )

  const renderPreviewArea = () => (
    <div className="flex flex-col">
      <h3 className="text-primary-title font-bold text-center mb-18px">
        預覽區
      </h3>
      <div className="flex flex-col justify-center items-center bg-input rounded-6px flex-1 py-4">
        <div className="w-full h-full flex flex-col">
          <div className="flex-1 relative">
            {(croppedImage || imageSrc) && (
              <Image
                src={
                  isCropping ? (imageSrc as string) : (croppedImage as string)
                }
                alt="Preview"
                fill
                className="object-contain"
              />
            )}
          </div>
        </div>
      </div>
    </div>
  )

  const handleUpload = async () => {
    if (!materialName) {
      alert('請輸入素材名稱！')
      return
    }

    try {
      if (croppedImage) {
        const fileBase64 = croppedImage.split(',')[1] as string
        await uploadMaterial({
          name: materialName,
          width: imageWidth as number,
          height: imageHeight as number,
          playSecond: 0,
          fileBase64
        })
      } else {
        console.error('croppedImage is null')
        // Handle the case where croppedImage is null
      }
    } catch (error) {
      console.error(error)
    }
  }
  return (
    <div className="flex flex-col gap-7">
      <div className="flex flex-col px-14 pt-9 pb-6 bg-white rounded-xl shadow-common">
        <div className="grid grid-cols-2 gap-9 mb-3">
          <div className="flex flex-col">
            <h3 className="text-primary-title font-bold mb-18px">
              素材限制：{' '}
              <span>
                尺寸 720 x 1280，32MB以下， 影片格式 MP4， 影片長度 150秒
              </span>
            </h3>
            <div className="flex items-center mb-18px">
              <label
                className="text-primary-title font-bold mr-4"
                htmlFor="material-name"
              >
                素材名稱<span className="text-required">*</span>
              </label>
              <Input
                id="material-name"
                className="!py-2 text-sm flex-1"
                value={materialName}
                onChange={(e) => setMaterialName(e.target.value)}
                placeholder="請輸入素材名稱"
                required
              />
            </div>
            {renderUploadArea()}
            {imageSrc && (
              <div className="mt-14px flex justify-between gap-5">
                <p className="py-4 bg-input rounded-6px flex-1 text-primary-title font-bold text-center">
                  {imageName}
                </p>
                <Button
                  className="rounded-6px py-4 font-bold bg-primary flex-1 whitespace-nowrap text-ellipsis overflow-hidden"
                  {...getRootProps()}
                >
                  <input {...getInputProps()} />
                  重新選擇上傳圖檔
                </Button>
              </div>
            )}
          </div>
          {renderPreviewArea()}
        </div>
        <p className="text-required font-bold">*素材送審時間需要2個工作日</p>
      </div>
      <div className="flex justify-center gap-9">
        <Button
          className="rounded-40px py-4 px-14 font-bold bg-primary disabled:bg-disabled"
          disabled={!imageSrc}
          onClick={handleCrop}
        >
          剪裁並預覽
        </Button>
        <Button
          className="rounded-40px py-4 px-14 font-bold bg-primary disabled:bg-disabled"
          disabled={!imageSrc}
          onClick={handleUpload}
        >
          圖片上傳
        </Button>
      </div>
    </div>
  )
}

export default ImageUpload
