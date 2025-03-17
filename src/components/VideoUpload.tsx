import { useDropzone } from 'react-dropzone'
import Input from '@/components/Input'
import Image from 'next/image'
import Button from '@/components/Button'
import Message from '@/components/Message'
import { useMessage } from '@/lib/hooks/useMessage'
import { uploadMaterial } from '@/api/module/material'

interface VideoInfo {
  src: string | null
  type: string
  name: string
  width: number | null
  height: number | null
  size: number | null
  duration: number | null
}

const MAX_FILE_SIZE = 32 * 1024 * 1024 // 32MB
// const MAX_DIMENSIONS = { width: 720, height: 1280 };
const MAX_DURATION = 150

const VideoUpload = () => {
  const [materialName, setMaterialName] = useState('')
  const [videoInfo, setVideoInfo] = useState<VideoInfo>({
    src: null,
    type: '',
    name: '',
    width: null,
    height: null,
    size: null,
    duration: null
  })
  const { message, showMessage, closeMessage } = useMessage()

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      const selectedFile = acceptedFiles[0]

      if (!selectedFile || !selectedFile.type.startsWith('video/')) {
        showMessage('請選擇有效的影片文件！')
        return
      }

      if (selectedFile.size > MAX_FILE_SIZE) {
        showMessage('影片大小須小於 32 MB')
        return
      }

      const reader = new FileReader()
      reader.onload = () => {
        const video = document.createElement('video')
        video.src = reader.result as string

        video.onloadedmetadata = () => {
          // if (video.videoWidth > MAX_DIMENSIONS.width || video.videoHeight > MAX_DIMENSIONS.height) {
          //   showMessage(`影片尺寸須小於 ${MAX_DIMENSIONS.width} x ${MAX_DIMENSIONS.height}`);
          //   return;
          // }
          if (video.duration > MAX_DURATION) {
            showMessage(`影片秒數須小於 ${MAX_DURATION} 秒`)
            return
          }
          setVideoInfo({
            src: reader.result as string,
            type: selectedFile.type,
            name: selectedFile.name,
            width: video.videoWidth,
            height: video.videoHeight,
            size: selectedFile.size,
            duration: video.duration
          })
        }
      }

      reader.readAsDataURL(selectedFile)
    },
    [showMessage]
  )

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: { 'video/mp4': [], 'video/mp3': [] },
    maxFiles: 1,
    maxSize: MAX_FILE_SIZE
  })

  const renderUploadArea = useMemo(
    () => (
      <div
        className="bg-input rounded-6px relative cursor-pointer h-[300px]"
        {...getRootProps()}
      >
        <input {...getInputProps()} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col justify-center items-center">
          <Image src="/icons/add.svg" width={32} height={32} alt="add" />
          <p className="font-bold text-sm mt-3">請選擇檔案或拖曳素材至此</p>
        </div>
      </div>
    ),
    [getRootProps, getInputProps]
  )

  const renderPreviewArea = useCallback(
    () => (
      <div className="flex flex-col">
        <h3 className="text-primary-title font-bold text-center mb-18px">
          預覽區
        </h3>
        <div className="flex flex-col justify-center items-center bg-input w-full rounded-6px px-4 flex-1">
          {videoInfo && videoInfo.src && (
            <video
              key={videoInfo.src}
              controls
              className="w-full !max-h-[320px] object-cover"
            >
              <source src={videoInfo.src} type={videoInfo.type} />
            </video>
          )}
        </div>
      </div>
    ),
    [videoInfo]
  )

  const handleUpload = async () => {
    if (!materialName.trim()) {
      showMessage('請輸入素材名稱！')
      return
    }

    if (!videoInfo.src) {
      showMessage('請選擇影片文件！')
      return
    }

    try {
      await uploadMaterial({
        name: materialName,
        width: videoInfo.width as number,
        height: videoInfo.height as number,
        playSecond: Math.ceil(videoInfo.duration as number) || 0,
        fileBase64: videoInfo.src.split(',')[1],
        fileExt: videoInfo.type.split('/')[1]
      })
      showMessage('影片上傳成功！')
    } catch (error) {
      console.error('影片上傳失敗：', error)
      showMessage('影片上傳失敗，請稍後重試！')
    }
  }

  return (
    <div className="flex flex-col gap-7">
      <div className="flex flex-col px-14 pt-9 pb-6 bg-white rounded-xl shadow-common">
        <div className="grid grid-cols-2 gap-9 h-full mb-3">
          <div className="flex flex-col">
            <h3 className="text-primary-title font-bold mb-18px">
              素材限制：
              <span>32MB以下， 影片格式 MP4/MP3， 影片長度 150秒</span>
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
            {!videoInfo.src ? (
              renderUploadArea
            ) : (
              <div>
                <div className="flex justify-between gap-5 mb-5">
                  <p className="py-4 bg-input rounded-6px flex-1 text-primary-title font-bold text-center">
                    {videoInfo.name}
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
                  <li>影片尺寸： {`${videoInfo.width}*${videoInfo.height}`}</li>
                  <li>
                    影片大小： {(videoInfo.size! / 1024 / 1024).toFixed(2)}MB
                  </li>
                  <li>影片秒數： {videoInfo.duration?.toFixed(2)}秒</li>
                </ul>
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
          disabled={!videoInfo.src}
          onClick={handleUpload}
        >
          影片上傳
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

export default VideoUpload
