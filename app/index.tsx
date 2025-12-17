import React, {useState, useRef} from 'react'
import {
  View,
  Text,
  Button,
  StyleSheet
} from 'react-native'
import RPC from 'bare-rpc'
import { Worklet } from 'react-native-bare-kit'
import b4a from 'b4a'
import bundle from '../.pear/bundles/0d6e4079e36703ebd37c00722f5891d28b0e2811dc114b129215123adcce3605.bundle.js'

export default function App() {
  const [signals, setSignals] = useState([])
  const pipeRef = useRef(null)

  const startWorklet = () => {
    const worklet = new Worklet()
    // const pipe = rn("bot") // TODO: coresponds to folders in pearends (folders are pear apps)
    worklet.start('/0d6e4079e36703ebd37c00722f5891d28b0e2811dc114b129215123adcce3605.bundle', bundle)
    const pipe = worklet.IPC
    console.log(pipe)

    pipeRef.current = pipe

    // set up rpc
    const rpc = new RPC(pipe, (req) => {
      if (req.command === 0) {
        setSignals((prevSignals) => [...prevSignals, b4a.toString(req.data)]);
      }
    })
    // send request to pearend
    const req = rpc.request(0)
    req.send('ping')
  }

  // cleanup
  const destroyWorklet = () => {
    if (pipeRef.current !== null) pipeRef.current.destroy()
    setSignals([])
  }

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Mobile-example 📱🍐</Text>
      {signals.length !== 0 ? <Button title='Reset' onPress={destroyWorklet}color='#b0d943' /> : <Button title='Test Workers' onPress={startWorklet} color='#b0d943' />}
      <View style={styles.container}>
        {signals.map((signal, index) => (
          <Text key={index} style={styles.heading}>{signal}</Text>
        ))}
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
