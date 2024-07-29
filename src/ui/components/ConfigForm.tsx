import { useState, useEffect } from "react"
import { Textarea } from "../mini-components/Textarea"
import { Button } from "react-native-paper"
import { getConfigFormStyle } from "../styles/components/ConfigFormStyle"
import { getTextInputStyle } from "../styles/mini/TextInputStyle2"

import { getGlobal, updateGlobal } from "../../inits/globals.init.ts"

type Props = {
  onChange?: Function,
  closeFunc?: Function
}

export function ConfigForm({ onChange, closeFunc }: Props) {
  const style = getConfigFormStyle()
  const textareaStyle = getTextInputStyle(true)

  const [host_ip, setHostIp] = useState("")
  const [server_port, setServerPort] = useState(0)
  const [app_port, setAppPort] = useState(0)

  useEffect(() => {
    refreshHandler()
  }, [])

  const refreshHandler = () => {
    const config = getGlobal("config")
    if (!config) return;
    setHostIp(config.host_ip || "localhost")
    setServerPort(config.server_port || 5000)
    setAppPort(config.app_port || 8081)
  }

  const changeHandler = () => {
    const config = {
      host_ip,
      server_port: parseInt(server_port),
      app_port: parseInt(app_port)
    }
    console.log(config)
    if (onChange) {
      onChange(config)
    }
  }

  return (
    <div style={style.main}>
      <Textarea 
        label="Host Ip"
        value={host_ip}
        style={textareaStyle}
        onChangeText={(val) => setHostIp(val)}
      />
      <Textarea 
        label="Server Port"
        value={String(server_port)}
        style={textareaStyle}
        onChangeText={(val) => setServerPort(val)}
        keyboardType={"numeric"}
      />
      <Textarea 
        label="App Port"
        value={String(app_port)}
        style={textareaStyle}
        onChangeText={(val) => setAppPort(val)}
        keyboardType={"numeric"}
      />
      <Button onPress={changeHandler}>Change</Button>
      <Button onPress={refreshHandler}>Refresh</Button>
      <Button onPress={() => closeFunc()}>Close</Button>
    </div>
  )
}
