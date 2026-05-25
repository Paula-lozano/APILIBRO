import { useState } from 'react';
import { useUser } from '../context/UserContext';
import { useNavigate } from 'react-router-dom';
import styles from './Usuario.module.css';

function Usuario() {
  const { user, login, logout, register } = useUser();
  const [isLogin, setIsLogin] = useState(true);
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setMessage('');

    if (isLogin) {
      const success = login(email, password);
      if (success) {
        setMessage('Inicio de sesión exitoso');
        setEmail('');
        setPassword('');
        setTimeout(() => navigate('/'), 1200);
      } else {
        setMessage('Credenciales inválidas o usuario no registrado');
      }
    } else {
      const success = register(name, email, password);
      if (success) {
        setMessage('Registro exitoso. Ahora inicia sesión.');
        setIsLogin(true);
        setName('');
        setEmail('');
        setPassword('');
      } else {
        setMessage('Error: el email ya existe o campos vacíos');
      }
    }
  };

  if (user) {
    return (
      <div className={styles.container}>
        <div className={styles.userPanel}>
          <h1 className={styles.title}>Bienvenido, {user.name}!</h1>
          <p className={styles.email}>Email: {user.email}</p>
          <button
            onClick={() => {
              logout();
              navigate('/');
            }}
            className={styles.logoutButton}
          >
            Cerrar sesión
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.formContainer}>
        <h1 className={styles.title}>{isLogin ? 'Iniciar Sesión' : 'Registrarse'}</h1>

        <form onSubmit={handleSubmit} className={styles.form}>
          {!isLogin && (
            <input
              type="text"
              placeholder="Nombre completo"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className={styles.input}
              required
            />
          )}
          <input
            type="email"
            placeholder="Correo electrónico"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={styles.input}
            required
          />
          <input
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={styles.input}
            required
          />
          <button type="submit" className={styles.submitButton}>
            {isLogin ? 'Ingresar' : 'Registrarme'}
          </button>
        </form>

        {message && <p className={styles.message}>{message}</p>}

        <button
          onClick={() => {
            setIsLogin(!isLogin);
            setMessage('');
            setEmail('');
            setPassword('');
            setName('');
          }}
          className={styles.switchButton}
        >
          {isLogin ? '¿No tienes cuenta? Regístrate' : '¿Ya tienes cuenta? Inicia sesión'}
        </button>
      </div>
    </div>
  );
}

export default Usuario;