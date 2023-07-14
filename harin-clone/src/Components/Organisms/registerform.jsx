import Container from "../Atoms/Container";
import Button from "../Atoms/Button";
import InputGroup from "../Molecules/InputGroup";
import { register, checkUnique } from "../../Servicies/user";
import useInput from "../../Hooks/useinput";
import Box from "../Atoms/Box";
import { setEmail } from "../../Store/Slices/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";


const RegisterForm = ( ) => {
  const dispatch = useDispatch()

  const inputStyle = "text-justify items-cneter m-3 p-3 border-solid border-2 rounded";

  const { value, handleOnChange } = useInput({
    username: "",
    email: "",
    password: "",
    passwordConfirm: "",
  });

  const [isClicked, setClicked] = useState(false)


  const validPw = (password) => {
    const validPwLength = 8 <= password.length && password.length <= 20;
    const validPwStructure = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]+$/;

    if (!password) {
      return null
    }
    if (!validPwLength) {
      return <p className="text-sm text-right m-3 text-red-400">8에서 20자 이내여야 합니다.</p>
    }
    if (!validPwStructure.test(password)) {
      return <p className="text-sm text-right m-3 text-red-400">영문, 숫자, 특수문자가 포함되어야하고 공백이 포함될 수 없습니다.</p>
    }
  }

  const validEmail = (email) => {
    const validEmailStructure = /^[\w\.-]+@[\w\.-]+\.\w+$/

    if (!email) {
      return null
    }
    if (!validEmailStructure.test(email)) {
      return <p className="text-sm text-right m-3 text-red-400">이메일 형식으로 작성해주세요.</p>
    }
  }

  const validAll = (props) => {
    if (props.email && props.username && props.password && props.passwordConfirm) {
      return false
    } else { return true }
  }


  const checkReq = () => {
    checkUnique({
      email:value.email
    })
      .then((res) => {
        // return <p className="text-green-400">사용할 수 있는 이메일입니다.</p>
        // alert('사용할 수 있는 이메일입니다')
      })

      .catch((err) => {
        // return <p className="text-red-400">{err.name}</p>
        alert(err.response)
      })
  }

  const registerReq = () => {
    register({
      username: value.username,
      email: value.email,
      password: value.password,
      passwordConfirm: value.passwordConfirm
    })
      .then((res) => {
        console.log(res);
        // alert('회원가입이 완료되었습니다')
      })
      .catch((err) => {
        console.log('err', err);
        alert(err.response)
      })
  }

  const navigate = useNavigate()


  return (
    <div className="flex min-h-screen justify-center items-center">
      <Container className= "mx-auto w-1/3 h-2/3 align-middle  border-solid border-2">
        <div className="object-center	text-xl p-3 m-3 font-semibold text-center">Sign up</div>
        <InputGroup 
          id="username" 
          type="text" 
          name="username"
          placeholder="이름을 입력하세요" 
          label="이름" 
          value={value.username}
          onChange={handleOnChange}
          className={inputStyle} 
        />
        <InputGroup 
          id="email" 
          type="email" 
          name="email"
          placeholder="이메일을 입력하세요" 
          label="이메일" 
          value={value.email}
          onChange={(e) => {
            handleOnChange(e)
            checkReq()
          }}
          className={inputStyle} 
        />
        {validEmail(value.email)}
        <InputGroup 
          id="password" 
          type="password" 
          name="password"
          placeholder="비밀번호를 입력하세요" 
          label="비밀번호" 
          value={value.password}
          onChange={handleOnChange}
          className={inputStyle} 
        />
        {validPw(value.password)}
        <InputGroup 
          id="passwordConfirm" 
          type="password" 
          name="passwordConfirm"
          placeholder="비밀번호를 다시 입력하세요" 
          label="비밀번호 확인" 
          value={value.passwordConfirm}
          onChange={handleOnChange}
          className={inputStyle} 
        />    
        <>{value.password === value.passwordConfirm ? null : <p className="text-sm text-right m-3 text-red-400">비밀번호가 일치하지 않습니다</p>}</>
        {validAll(value)}
        <Box className="m-3">
          <Button 
            onClick={() => {
              setClicked(!isClicked)
              registerReq()
              navigate("/")            
            }}
            disabled={validAll(value)}
            className={validAll(value) ? "items-center text-center w-full h-12 mt-4 rounded bg-stone-300 transition-colors	" 
                        : "items-center text-center w-full h-12 mt-4 rounded bg-amber-300"}
          >
          회원가입
          </Button>
        </Box>  
      </Container>
    </div>
  );
};

export default RegisterForm;