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

export const Login = () => {
  const location = useLocation();
  const initialPath = location.state?.initialPath;
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: 'onBlur' });

  const handleClickResetButton = (e) => {
    e.preventDefault();
    navigate('/reset-password', {
      replace: true,
      state: { backgroundLocation: location, initialPath },
    });
  };

  const handleClickRegistrationButton = (e) => {
    e.preventDefault();
    navigate('/register', {
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
    <Form title="Вход" handleFormSubmit={handleSubmit(sentRegisterApi)}>
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

      <p className="infoText link" onClick={handleClickResetButton}>
        Восстановить пароль
      </p>
      <FormButton type="submit" color="yellow">
        Войти
      </FormButton>
      <FormButton
        color="white"
        type="button"
        onClick={handleClickRegistrationButton}
      >
        Регистрация
      </FormButton>
    </Form>
  );
};
