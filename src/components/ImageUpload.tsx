import { useDropzone } from 'react-dropzone'
import Button from '@/components/Button'
import Input from '@/components/Input'
import Image from 'next/image'
import { Cropper, CropperRef } from 'react-advanced-cropper'
import 'react-advanced-cropper/dist/style.css'
import { uploadMaterial } from '@/api/module/material'
import Message from '@/components/Message'
import { useMessage } from '@/lib/hooks/useMessage'

const MAX_FILE_SIZE = 2 * 1024 * 1024 // 2MB
// const MAX_DIMENSIONS = { width: 720, height: 1280 };

const ImageUpload = () => {
  const [materialName, setMaterialName] = useState<string>('')
  const [imageInfo, setImageInfo] = useState({
    src: null as string | null,
    name: '',
    width: null as number | null,
    height: null as number | null,
    cropped: null as string | null
  })
  const [isCropping, setIsCropping] = useState<boolean>(true)
  const { message, showMessage, closeMessage } = useMessage()

  const cropperRef = useRef<CropperRef>(null)

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      const file = acceptedFiles[0]
      if (!file || !file.type.startsWith('image/'))
        return showMessage('請上傳圖片格式的檔案！')

      if (file.size > MAX_FILE_SIZE) {
        showMessage('照片大小須小於 2 MB')
        return
      }

      const reader = new FileReader()
      reader.onload = () => {
        const img = new window.Image()
        img.src = reader.result as string
        img.onload = () => {
          // if (img.width > MAX_DIMENSIONS.width || img.height > MAX_DIMENSIONS.height) {
          //   showMessage(`照片尺寸須小於 ${MAX_DIMENSIONS.width} x ${MAX_DIMENSIONS.height}`)
          //   return
          // }
          setImageInfo({
            src: reader.result as string,
            name: file.name,
            width: img.width,
            height: img.height,
            cropped: reader.result as string
          })
          setIsCropping(true)
        }
      }
      reader.readAsDataURL(file)
    },
    [showMessage]
  )

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
      'image/jpeg': [],
      'image/png': []
    },
    maxFiles: 1,
    maxSize: MAX_FILE_SIZE
  })

  const handleCrop = () => {
    const canvas = cropperRef.current?.getCanvas()
    if (canvas) {
      setImageInfo((prev) => ({ ...prev, cropped: canvas.toDataURL() }))
      setIsCropping(false)
    }
  }

  const renderUploadArea = () => (
    <div className="bg-input rounded-6px relative cursor-pointer h-[300px]">
      {imageInfo.src ? (
        <div className="w-full h-full flex flex-col">
          <div className="flex-1 relative h-full">
            <Cropper
              ref={cropperRef}
              src={imageInfo.src}
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
            {imageInfo.cropped && (
              <Image
                src={isCropping ? imageInfo.src! : imageInfo.cropped}
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
    if (!materialName.trim()) {
      showMessage('請輸入素材名稱！')
      return
    }

    if (!imageInfo.cropped) {
      showMessage('請先裁切圖片！')
      return
    }

    try {
      const fileBase64 = imageInfo.cropped.split(',')[1]
      await uploadMaterial({
        name: materialName,
        width: imageInfo.width!,
        height: imageInfo.height!,
        playSecond: 0,
        fileBase64,
        fileExt: 'jpg'
      })
      showMessage('上傳成功！')
    } catch (error) {
      console.error('上傳失敗:', error)
      showMessage('上傳失敗，請稍後再試！')
    }
  }
  return (
    <div className="flex flex-col gap-7">
      <div className="flex flex-col px-14 pt-9 pb-6 bg-white rounded-xl shadow-common">
        <div className="grid grid-cols-2 gap-9 mb-3">
          <div className="flex flex-col">
            <h3 className="text-primary-title font-bold mb-18px">
              素材限制：
              <span>2MB以下，上傳檔案格式：Jpeg/jpg/png</span>
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
            {imageInfo.src && (
              <div className="mt-14px flex justify-between gap-5">
                <p className="py-4 bg-input rounded-6px flex-1 text-primary-title font-bold text-center">
                  {imageInfo.name}
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
          disabled={!imageInfo.src}
          onClick={handleCrop}
        >
          剪裁並預覽
        </Button>
        <Button
          className="rounded-40px py-4 px-14 font-bold bg-primary disabled:bg-disabled"
          disabled={!imageInfo.src}
          onClick={handleUpload}
        >
          圖片上傳
        </Button>
      </div>
      <Message
        open={message.open}
        text={message.text}
        duration={message.duration}
        onClose={closeMessage}
      />
    </div>
  )
}

export default ImageUpload
