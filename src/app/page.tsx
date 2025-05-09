'use client'

// TODO: 選擇的地點要用紫色框線標記
// TODO: sidebar搜尋結果載入效果
// TODO: 右邊選擇項目要有分頁
// TODO: InfoWindow 1. 加入圖片 2. 按鈕設為中心 + 加入地點
// TODO: 拖拉時不要一直觸發打api
// TODO: 拆分組件
// TODO: 日曆樣式要修正
// TODO: 要加型別

import DeviceMap from '@/components/DeviceMap'
import DeviceSelect from '@/components/DeviceSelect'
import MaterialSelect from '@/components/MaterialSelect'

function Advertising() {
  const [mode, setMode] = useState('地圖')
  const [step, setStep] = useState(1)
  const handleModeChange = (value: string) => {
    setMode(value)
  }
  const renderDeviceSelect = () => {
    if (mode === '地圖') {
      return (
        <DeviceMap
          onModeChange={handleModeChange}
          mode={mode}
          onNext={() => setStep(2)}
        />
      )
    } else if (mode === '搜尋') {
      return (
        <DeviceSelect
          isFinish={false}
          onModeChange={handleModeChange}
          mode={mode}
          onNext={() => setStep(2)}
        />
      )
    }
  }

  return (
    <>
      {step === 1 && renderDeviceSelect()}
      {step === 2 && (
        <MaterialSelect onNext={() => setStep(3)} onPrev={() => setStep(1)} />
      )}
      {step === 3 && (
        <DeviceSelect
          isFinish={true}
          onModeChange={handleModeChange}
          mode={mode}
          onNext={() => setStep(1)}
        />
      )}
    </>
  )
}

export default Advertising
