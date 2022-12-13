import { useForm } from 'react-hook-form';
import { EMAIL_REGEXP, VALIDATE_CONFIG } from '../../utils/constants';
import { FormButton } from '../FormButton/form-button';
import { FormInput } from '../FormInput/form-input';
import Form from '../Form/form';

export const ResetPass = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: 'onBlur' });

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

  return (
    <Form
      title="Восстановление пароля"
      handleFormSubmit={handleSubmit(sentRegisterApi)}
    >
      <p className="infoText">
        Для получения временного пароля необходимо ввести Email, указанный при
        регистрации.
      </p>
      <FormInput
        {...emailRegister}
        id="email"
        type="text"
        placeholder="email"
      />

      {errors?.email && (
        <p className="errorMessage">{errors?.email?.message}</p>
      )}

      <p className="infoText">Срок действия временного пароля 24 часа</p>
      <FormButton type="submit" color="yellow">
        Отправить
      </FormButton>
    </Form>
  );
};
