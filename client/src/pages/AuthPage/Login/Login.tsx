import { useRef, useState } from 'react';
import styles from '../../../pages/AuthPage/AuthPage.module.css';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { Box, TextField, Button, InputAdornment, IconButton } from '@mui/material';
import { useForm } from 'react-hook-form';
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
import DoubleArrowIcon from '@mui/icons-material/DoubleArrow';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { zodResolver } from '@hookform/resolvers/zod';
import { loginSchema } from '../../../schemas/auth.schema';
import { logInRequest } from '../../../api/auth';
import { isAxiosError } from 'axios';
import {ERROR_MESSAGES} from '../../../constants/errorMessages';
import { useGenericContext } from '../../../hooks/useGenericContext';
import { toastrContext } from '../../../context/ToastrContext';
import { User } from '../../../types/interfaces/auth';
import { useNavigate } from 'react-router-dom';

function Login( {setShowLogin} : {setShowLogin: React.Dispatch<React.SetStateAction<boolean>>}) {
  const [showPassword, setShowPassword] = useState(false);
  const form: any = useRef(null);
  const { register, formState: { errors }, watch, reset, handleSubmit } = useForm<User>({
    resolver: zodResolver(loginSchema),
    mode: 'onSubmit'
  });
  const passwordValue = watch("password");
  const {showToastr} = useGenericContext(toastrContext);
  const navigate = useNavigate();

  const theme = createTheme({
    components: {
      MuiInput: {
        styleOverrides: {
          root: {
            color: 'white',
            backgroundColor: 'transparent',
            width: '300px',
            '&:before': {
              borderBottom: '2px solid #60495A',
            },
            '&:hover:not(.Mui-disabled):before': {
              borderBottom: '2px solid #60495A',
            },
            '&:after': {
              borderBottom: '2px solid #60495A',
            },
            ['@media (max-width:450px)']: {
              width: '200px'
            }
          },
        },
      },
      MuiInputLabel: {
        styleOverrides: {
          root: {
            color: 'white',
            fontSize: '22px',
            transform: 'translate(0, 13px) scale(1)',
            '&.Mui-focused': {
              color: 'white',
            },
            '&.MuiInputLabel-shrink': {
              transform: 'translate(0, -10px) scale(0.85)',
            },
            ['@media (max-width:450px)']: {
              fontSize: '20px'
            }
          },
        },
      },
      MuiSvgIcon: {
        styleOverrides: {
          root: {
            color: '#FAEDCD',
            fontSize: '28px',
            marginRight: '20px'
          }
        }
      }
    },
  });

  
  const logIn = async (dataUser: User) => {
    try {
      const responseApi = await logInRequest(dataUser);
      console.log(responseApi);
      reset();
      showToastr(responseApi.data.message, "success");
      navigate('/home')
    } catch (error) {
      if (isAxiosError(error)) {
        console.error("Request error:", error.response?.data.message  || error.message);
        showToastr(ERROR_MESSAGES[error.response?.data.code ] || "Ocurrió un error inesperado", "error");
      }
      
    }
  };

  return (
    <>
      <h1 className={styles.titleAuth}>LOGIN</h1>
      <div className={styles.contentCard}>
        <form ref={form} className={styles.form} onSubmit={handleSubmit(logIn)}>
          <ThemeProvider theme={theme}>
            <div className={styles.divInputs}>
              {/* Email Input */}
              <div className={styles.inputs}>
                <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                  <AlternateEmailIcon />
                  <TextField
                    id="input-with-sx"
                    label="Email"
                    variant="standard"
                    autoComplete='off'
                    error={!!errors.email}
                    {...register('email')}
                  />
                </Box>
                <p className={`${styles.messageError} ${errors.email ? styles.visible : ''}`}>{errors.email?.message?.toString()}</p>
              </div>
              
              {/* Password Input */}
              <div className={styles.inputs}>
                <Box sx={{ display: "flex", alignItems: "flex-end" }}>
                  <LockOutlinedIcon fontSize="small" />
                  <TextField
                    label="Password"
                    variant="standard"
                    type={showPassword ? "text" : "password"}
                    autoComplete="off"
                    error={!!errors.password}
                    InputProps={{
                      endAdornment: passwordValue && (
                        <InputAdornment position="end">
                          <IconButton onClick={() => setShowPassword((prev) => !prev)} edge="end">
                            {showPassword ? <VisibilityOff sx={{ fontSize: "20px" }} /> : <Visibility sx={{ fontSize: "20px" }} />}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                    {...register("password")}
                  />
                </Box>
                <p className={`${styles.messageError} ${errors.password ? styles.visible : ''}`}>{errors.password?.message?.toString()}</p>

              </div>
            </div>

          </ThemeProvider>
          <Button type='submit' size='large' variant="contained" startIcon={<DoubleArrowIcon />} disabled={false} sx={{
            backgroundColor: '#5e4457',
            color: '#F0EBD8',
            fontWeight: 700,
            gap: '10px',
            fontSize: '16px',
            fontFamily: 'Ubuntu',
            '&:hover': {
              backgroundColor: '#755B71',
            },
            '&.Mui-disabled': {
                backgroundColor: 'rgba(96, 73, 90, 0.3)', // Override the default disabled black background
                color: 'rgba(240, 235, 216, 0.5)'
            },
          }}>
            Log in
          </Button>
          
          <h1 className={styles.textRegister}>Don't have an account? <button type='button' onClick={()=> setShowLogin(false)}>Sign Up</button></h1>
        </form>
      </div>
    </>

  );
};

export default Login