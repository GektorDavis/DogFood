import { useForm } from 'react-hook-form';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  EMAIL_REGEXP,
  PASSWORD_REGEXP,
  VALIDATE_CONFIG,
} from '../../utils/constants';
import Form from '../Form/form';
import { FormButton } from '../FormButton/form-button';
import { FormInput } from '../FormInput/form-input';

export const Register = () => {
  const location = useLocation();
  const initialPath = location.state?.initialPath;
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: 'onBlur' });

  const handleClickLoginButton = (e) => {
    e.preventDefault();
    navigate('/login', {
      replace: true,
      state: { backgroundLocation: location, initialPath },
    });
  };

  const sentRegisterApi = (data) => {
    console.log(data);
  };

  const emailRegister = register('email', {
    required: {
      value: true,
      message: VALIDATE_CONFIG.requaredMessage,
    },
    pattern: {
      value: EMAIL_REGEXP,
      message: VALIDATE_CONFIG.emailMessage,
    },
  });

  const passwordRegister = register('password', {
    required: {
      value: true,
      message: VALIDATE_CONFIG.requaredMessage,
    },
    pattern: {
      value: PASSWORD_REGEXP,
      message: VALIDATE_CONFIG.passwordMessage,
    },
  });

  return (
    <Form title="Регистрация" handleFormSubmit={handleSubmit(sentRegisterApi)}>
      <FormInput
        {...emailRegister}
        id="email"
        type="text"
        placeholder="email"
      />

      {errors?.email && (
        <p className="errorMessage">{errors?.email?.message}</p>
      )}

      <FormInput
        {...passwordRegister}
        id="password"
        type="password"
        placeholder="Пароль"
      />

      {errors?.password && (
        <p className="errorMessage">{errors?.password?.message}</p>
      )}

      <p className="infoText">
        Регистрируясь на сайте, вы соглашаетесь с нашими Правилами и Политикой
        конфиденциальности и соглашаетесь на информационную рассылку.
      </p>
      <FormButton type="submit" color="yellow">
        Зарегистрироваться
      </FormButton>
      <FormButton color="white" type="button" onClick={handleClickLoginButton}>
        Войти
      </FormButton>
    </Form>
  );
};
