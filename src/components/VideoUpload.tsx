import { useDropzone } from 'react-dropzone'
import Input from '@/components/Input'
// import Image from 'next/image'
import Button from '@/components/Button'

interface FileWithPreview extends File {
  preview: string
}

const VideoUpload = () => {
  const [materialName, setMaterialName] = useState('')
  const [file, setFile] = useState<FileWithPreview | null>(null)
  const [videoSrc, setVideoSrc] = useState<string | null>(null)

  const onDrop = (acceptedFiles: File[]) => {
    // for eslint
    console.log(videoSrc)
    setVideoSrc('')

    const selectedFile = acceptedFiles[0]
    setFile(
      Object.assign(selectedFile, {
        preview: URL.createObjectURL(selectedFile)
      })
    )
  }

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
      'video/mp4': [] // 限制影片類型
    },
    maxFiles: 1, // 僅允許一個文件
    maxSize: 32 * 1024 * 1024
  })

  // const renderUploadArea = () => (
  //   <div className='bg-input rounded-6px relative cursor-pointer h-[300px]' {...getRootProps()}>
  //     <input {...getInputProps()} />
  //     <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col justify-center items-center'>
  //       <Image src='/icons/add.svg' width={32} height={32} alt='add' />
  //       <p className='font-bold text-sm mt-3'>請選擇檔案或拖曳素材至此</p>
  //     </div>
  //   </div>
  // )

  const renderPreviewArea = () => (
    <div className="flex flex-col">
      <h3 className="text-primary-title font-bold text-center mb-18px">
        預覽區
      </h3>
      <div className="flex flex-col justify-center items-center bg-input w-full rounded-6px px-4 flex-1">
        {file && file.type.startsWith('video/') && (
          <video controls className="w-full !max-h-[320px] object-cover">
            <source src={file.preview} type={file.type} />
          </video>
        )}
      </div>
    </div>
  )

  useEffect(() => {
    return () => {
      if (file?.preview) {
        URL.revokeObjectURL(file.preview)
      }
    }
  }, [file])

  return (
    <div className="flex flex-col gap-7">
      <div className="flex flex-col px-14 pt-9 pb-6 bg-white rounded-xl shadow-common">
        <div className="grid grid-cols-2 gap-9 h-full mb-3">
          <div className="flex flex-col">
            <h3 className="text-primary-title font-bold mb-18px">
              素材限制： 
              <span>
                尺寸 720 x 1280，32MB以下， 影片格式 MP4， 影片長度 150秒
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
            {/* {renderUploadArea()} */}
            <div>
              <div className="flex justify-between gap-5 mb-5">
                <p className="py-4 bg-input rounded-6px flex-1 text-primary-title font-bold text-center">
                  {/* {imageName} */}
                  111
                </p>
                <Button
                  className="rounded-6px py-4 font-bold bg-primary flex-1 whitespace-nowrap text-ellipsis overflow-hidden"
                  {...getRootProps()}
                >
                  <input {...getInputProps()} />
                  重新選擇上傳圖檔
                </Button>
              </div>
              <ul className="text-primary-title font-bold flex flex-col gap-4">
                <li>影片尺寸： 1080*1922</li>
                <li>影片大小： 6.66MB</li>
                <li>影片秒數： 11秒</li>
              </ul>
            </div>
          </div>
          {renderPreviewArea()}
        </div>
        <p className="text-required font-bold">*素材送審時間需要2個工作日</p>
      </div>
      <div className="flex justify-center gap-9">
        <Button
          className="rounded-40px py-4 px-14 font-bold bg-primary disabled:bg-disabled"
          // disabled={!imageSrc}
          // onClick={handleUpload}
        >
          影片上傳
        </Button>
      </div>
    </div>
  )
}

export default VideoUpload
