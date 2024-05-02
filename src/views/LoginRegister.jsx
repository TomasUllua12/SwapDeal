import React from 'react'
import "./LoginRegister.css"

export function LoginRegister(props) {
    
 
    return (
        <>
            <body>
                <div className='wrapper'></div>
                <div className='overlay'>
                    <div className='container'>
                        <div className='main'>
                            <input type="checkbox" id='chk' aria-hidden="true" />

                            <div className='login'>
                                <form className='form'>
                                    <label htmlFor="chk" aria-hidden="true">Iniciar sesión</label>
                                    <input className="input" type="email" autoComplete='off'
                                    name='email' placeholder='Email' required=""/>
                                    <input className="input" type="password"
                                    name='pswd' placeholder='Password' required=""/>
                                    <button>Iniciar sesión</button>
                                </form>
                            </div>
                            
                            <div className='register'>
                                <form className='form'>
                                    <label htmlFor="chk" aria-hidden="true">Creá tu cuenta</label>
                                    <input className="input" type="text" autoComplete='off'
                                    name='txt' placeholder='Username' required=""/>
                                    <input className="input" type="email" autoComplete='off'
                                    name='email' placeholder='Email' required=""/>
                                    <input className="input" type="password"
                                    name='pswd' placeholder='Password' required=""/>
                                    <button>Crear</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </body>
            
        </>
    )
}
