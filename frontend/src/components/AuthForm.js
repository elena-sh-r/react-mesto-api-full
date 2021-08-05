import React from 'react';

function AuthForm(props) {
  return (
    <section className={`auth-form form_type_${props.name}`}>
      <form className={`auth-form__container auth-form__container_type_${props.name} form`} name={props.name} onSubmit={(e) => { props.onSubmit(e); }}>
        <h2 className="auth-form__title">{props.title}</h2>
        {props.children}
        <button className={`auth-form__save-button auth-form__save-button_type_${props.name}`} type="submit">{props.buttonText ?? "Отправить"}</button>
        {props.bottomText}
      </form>
    </section>
  );
}

export default AuthForm;