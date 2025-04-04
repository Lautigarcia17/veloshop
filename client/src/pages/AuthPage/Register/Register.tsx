import { useEffect,  useState } from 'react';
import styles from '../../../pages/AuthPage/AuthPage.module.css';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { Box, TextField, Button, InputAdornment, IconButton } from '@mui/material';
import { useForm } from 'react-hook-form';
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
import DoubleArrowIcon from '@mui/icons-material/DoubleArrow';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import CheckCircleOutlineOutlinedIcon from '@mui/icons-material/CheckCircleOutlineOutlined';
import { registerSchema } from '../../../schemas/auth.schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { User, UserRegister } from '../../../types/interfaces/auth';
import { registerRequest } from '../../../api/auth';
import { useGenericContext } from '../../../hooks/useGenericContext';
import { toastrContext } from '../../../context/ToastrContext';
import { isAxiosError } from 'axios';
import { ERROR_MESSAGES } from '../../../constants/errorMessages';

function Register({ setShowLogin }: { setShowLogin: React.Dispatch<React.SetStateAction<boolean>> }) {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const { register, formState: { errors }, watch, setValue, reset, handleSubmit } = useForm<UserRegister>({
    resolver: zodResolver(registerSchema),
    mode: 'onSubmit'
  });
  const [focusConfirmPassword, setFocusConfirmPassword] = useState(false);
  const passwordValue = watch("password");
  const confirmPasswordValue = watch("confirmPassword");
  const { showToastr } = useGenericContext(toastrContext);
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

  useEffect(() => {
    if (!passwordValue) {
      setValue("confirmPassword", ""); // Limpia el campo confirmPassword
    }
  }, [watch("password"), setValue]);

  const signUp = async (dataUser: User) => {
    try {
      const response = await registerRequest(dataUser);
      console.log(response)
      reset();
      showToastr('Te has registrado', "success");
    } catch (error) {
      if (isAxiosError(error)) {
        console.error("Request error:", error.response?.data.message || error.message);
        showToastr(ERROR_MESSAGES[error.response?.data.code] || "Ocurrió un error inesperado", "error");
      }

    }
  };

  return (
    <>
      <h1 className={styles.titleAuth}>SIGN UP</h1>
      <div className={styles.contentCard}>
        <form className={styles.form} onSubmit={handleSubmit(signUp)}>
          <div className={styles.divInputs}>
            <ThemeProvider theme={theme}>

              {/* Name Input */}
              <div className={styles.inputs}>
                <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                  <AlternateEmailIcon />
                  <TextField
                    id="input-with-sx"
                    label="Name"
                    variant="standard"
                    autoComplete='off'
                    error={!!errors.name}
                    {...register('name')}
                  />
                </Box>
                <p className={`${styles.messageError} ${errors.name ? styles.visible : ''}`}>{errors.name?.message?.toString()}</p>
              </div>

              {/* Surname Input */}
              <div className={styles.inputs}>
                <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                  <AlternateEmailIcon />
                  <TextField
                    id="input-with-sx"
                    label="Surname"
                    variant="standard"
                    autoComplete='off'
                    error={!!errors.name}
                    {...register('surname')}
                  />
                </Box>
                <p className={`${styles.messageError} ${errors.surname ? styles.visible : ''}`}>{errors.surname?.message?.toString()}</p>
              </div>


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

              {/* Confirm Password Input */}
              <div className={styles.inputs}>
                <Box sx={{ display: "flex", alignItems: "flex-end", pointerEvents: passwordValue ? "auto" : "none", }} >
                  <CheckCircleOutlineOutlinedIcon fontSize="small" />
                  <TextField
                    label="Confirm Password"
                    variant="standard"
                    type={showConfirmPassword ? "text" : "password"}
                    autoComplete="off"
                    error={!!errors.confirmPassword}
                    // helperText={errors.confirmPassword?.message?.toString()}
                    InputLabelProps={{
                      shrink: confirmPasswordValue || focusConfirmPassword ? true : false, // Levanta el label si hay valor o está enfocado
                    }}
                    InputProps={{
                      endAdornment: confirmPasswordValue && (
                        <InputAdornment position="end">
                          <IconButton onClick={() => setShowConfirmPassword((prev) => !prev)} edge="end">
                            {showConfirmPassword ? <VisibilityOff sx={{ fontSize: "20px" }} /> : <Visibility sx={{ fontSize: "20px" }} />}
                          </IconButton>
                        </InputAdornment>
                      ),
                      readOnly: !passwordValue,
                    }}
                    {...register("confirmPassword")}
                    onFocus={() => setFocusConfirmPassword(true)}
                    onBlur={() => setFocusConfirmPassword(false)}
                  />
                </Box>
                <p className={`${styles.messageError} ${errors.confirmPassword ? styles.visible : ''}`}>{errors.confirmPassword?.message?.toString()}</p>

              </div>




            </ThemeProvider>
          </div>

          <div className={styles.actions}>


            <Button type='submit' size='large' variant="contained" startIcon={<DoubleArrowIcon />} sx={{
              backgroundColor: '#60495A',
              color: '#F0EBD8',
              fontWeight: 700,
              gap: '10px',
              fontSize: '16px',
              fontFamily: 'Ubuntu',
              '&:hover': {
                backgroundColor: '#755B71',
              },
            }}>
              Sign Up
            </Button>

            <h1 className={styles.textRegister}>Do you have an account? <button type='button' onClick={() => setShowLogin(true)}>Log In</button></h1>
          </div>

        </form>
      </div>
    </>

  );
};

export default Register