import { useNavigate, Link } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();

  const handleLogin = () => {
    // Aquí puedes agregar la lógica de autenticación
    // Después de la autenticación exitosa, redirige al Dashboard
    navigate('/dashboard');
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
                    </div>

                    <form>
                      <div className="mb-4 flex flex-col">
                        <label htmlFor="email" className="text-[#676767]">
                          Usuario:
                        </label>
                        <input
                          className="rounded border border-[#F6BD43] focus:border-2 focus:border-amber-500 focus:outline-none text-[#676767] px-2 p-2 "
                          type="text"
                          id="username"
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
                          Olvide mi Contraseña
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
