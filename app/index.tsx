import React, {useState, useRef} from 'react'
import {
  View,
  Text,
  Button,
  StyleSheet
} from 'react-native'
import { documentDirectory } from 'expo-file-system'
import run from 'pear-run'
import bundle from './index.bundle.js'
import RPC from 'bare-rpc'
import b4a from 'b4a'

export default function App() {
  const [mainWorkerStatus, setMainWorkerStatus] = useState(false)
  const [subWorkerStatus, setSubWorkerStatus] = useState(false)
  const pipeRef = useRef(null)

  const startWorklet = () => {
    // run bundle and pass args if applicable
    const pipe = run('/index.bundle', bundle, [String(documentDirectory), 'testString'])
    pipeRef.current = pipe

    // set up rpc
    const rpc = new RPC(pipe, (req) => {
      if (req.command === 0) {
        setMainWorkerStatus(true)
        console.log(b4a.toString(req.data))
      }

      if (req.command === 1) {
        setSubWorkerStatus(true)
        console.log(b4a.toString(req.data))
      }
    })
    // send test request
    const req = rpc.request(0)
    req.send('ping')

  }

  const destroyWorklet = () => {
    if (pipeRef.current !== null) pipeRef.current.destroy()
    setMainWorkerStatus(false)
    setSubWorkerStatus(false)
  }

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Mobile-example 📱🍐</Text>
      {(mainWorkerStatus || subWorkerStatus) ? <Button title='Reset' onPress={destroyWorklet}color='#b0d943' /> : <Button title='Test Workers' onPress={startWorklet} color='#b0d943' />}
      <View style={styles.container}>
        {mainWorkerStatus && <Text style={styles.heading}>{'Main worker connected!\n👷🔌'}</Text>}
        {subWorkerStatus &&<Text style={styles.heading}>{'Sub worker connected!\n🚇🔌'}</Text>}
      </View>
      
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#011501',
    padding: 20

  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#b0d943',
    textAlign: 'center',
    marginBottom: 20
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    color: '#333'
  },
  dataItem: {
    padding: 10,
    backgroundColor: '#f0f0f0',
    marginVertical: 5,
    borderRadius: 5
  },
  itemText: {
    fontSize: 16,
    color: '#333'
  }
})
