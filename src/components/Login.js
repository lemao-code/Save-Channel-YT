import React,{useEffect, useState} from 'react'
import {Keyboard, Text} from 'react-native'
import { ContainerLogin, Input, Title, ButtonSignUp} from './style'
import getRealm from '../services/realm'

export default function Login ({visible}) {
    const [authenticated, setAuthenticated] = useState(false)
   async function handleLogin (name,pass) {

        try {
            const realm = await getRealm()
            const user =  realm.objects('user').filtered(`name = "${name}" AND pass = "${pass}"`)
            const retorno = Object.keys(user).length
            if(retorno == 0) {
                alert('Login nao encontrado')
            }else {

            for(let p of user) {
                    if(p.name === name && p.pass === pass) {
                        alert('Success')
                        
                    }
                }
            }
            
        }catch(err) {
            alert('Erro no login')
            console.log(err)
        }
    }

    const [name, setName] = useState('')
    const [pass, setPass] = useState('')
    const [box, setBox] = useState(-100)
    useEffect(() => {
        Keyboard.addListener("keyboardDidShow", _keyboardDidShow)
        Keyboard.addListener("keyboardDidHide", _keyboardDidHide)
        return () => {
            Keyboard.removeListener("keyboardDidShow", _keyboardDidShow)
            Keyboard.removeListener("keyboardDidHide", _keyboardDidHide)
          }                                                                             
    }, [])
    const _keyboardDidShow = () => {
        setBox(-320)
    }
    const _keyboardDidHide = () => {
       setBox(-100)
      }
    return (
        <ContainerLogin box={box} src={visible}>
            <Title>Welcome</Title>
            <Input value={name} onChangeText={text => setName(text)} placeholder="Name user" placeholderTextColor={"black"}/>
            <Input value={pass} onChangeText={text => setPass(text)} secureTextEntry={true} placeholder="Password" placeholderTextColor={"black"}/>
            <ButtonSignUp onPress={() => handleLogin(name,pass)}><Text style={{color: "white", fontSize: 20}}>Sign In</Text></ButtonSignUp>
        </ContainerLogin>
    )
}