import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import setupWebSocket from '../../components/socket';

const Login = () => {
  const navigate = useNavigate();
  const [correo, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const handleLogin = async () => {
    try {
      const response = await fetch('http://localhost:3000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ correo, password })
      });

      if (response.ok) {
        const data = await response.json();

         setupWebSocket((data) => {
          // Función para manejar los datos recibidos del WebSocket
          // Aquí puedes hacer lo que necesites con los datos recibidos
          console.log('Datos recibidos del WebSocket:', data);
        });
        // Almacena el token en el localStorage
        localStorage.setItem('token', data.token);
        // Redirige al Dashboard
        navigate('/dashboard');
      } else {
        const errorMessage = await response.text();
        throw new Error(errorMessage);
      }
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <section className="h-screen bg-[#f5f5f5] flex items-center justify-center">
      <div className="container h-full p-10">
        <div className="g-6 flex h-full flex-wrap items-center justify-center text-[#676767]">
          <div className="w-full">
            <div className="block rounded-lg bg-white shadow-lg">
              <div className="g-0 lg:flex lg:flex-wrap">
                <div className="px-4 md:px-0 lg:w-6/12">
                  <div className="md:mx-6 md:p-12">
                    <div className="text-center">
                      <h4 className="mb-12 mt-1 pb-1 text-3xl font-semibold">
                        Inicio de Sesión
                      </h4>
                      {error && <p className="text-red-500">{error}</p>}
                    </div>

                    <form>
                      <div className="mb-4 flex flex-col">
                        <label htmlFor="email" className="text-[#676767]">
                          Usuario:
                        </label>
                        <input
                          className="rounded border border-[#F6BD43] focus:border-2 focus:border-amber-500 focus:outline-none text-[#676767] px-2 p-2 "
                          type="email"
                          id="email"
                          value={correo}
                          onChange={(e) => setEmail(e.target.value)}
                        />
                      </div>

                      <div className="mb-4 flex flex-col">
                        <label htmlFor="password" className="text-[#676767]">
                          Contraseña:
                        </label>
                        <input
                          className="rounded border border-[#F6BD43] focus:border-2 focus:border-amber-500 focus:outline-none text-[#676767] px-2 p-2"
                          type="password"
                          id="password"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                        />
                      </div>

                      <div className="mb-12 pb-1 pt-1 text-center">
                        <button
                          className="mt-8 inline-block w-full rounded px-6 pb-2 pt-2.5 text-sm font-medium uppercase leading-normal text-white bg-[#F6BD43] hover:bg-amber-500"
                          type="button"
                          onClick={handleLogin}
                        >
                          Iniciar sesión
                        </button>
                        <Link
                          to="/signin"
                          className="inline-block w-full text-center mt-4 text-sm text-[#676767] hover:text-custom-yellow"
                        >
                          Olvidé mi Contraseña
                        </Link>
                      </div>
                    </form>
                  </div>
                </div>

                <div className="flex items-center rounded-b-lg lg:w-6/12 lg:rounded-r-lg lg:rounded-bl-none bg-[#F6BD43]">
                  <div className="px-4 py-6 text-white md:mx-6 md:p-12">
                    <h4 className="mb-6 text-2xl font-semibold">BananoTrack</h4>
                    <p className="text-base">Bienvenido A BananoTrack</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
