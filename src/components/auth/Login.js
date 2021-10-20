import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import * as yup from "yup";
import { login } from "../../slices/authSlice";

const schema = yup.object().shape({
    email: yup.string().required().email(),
    password: yup.string().min(6, "Too Short!").required("Required"),
  });
const Login = () => {
  const loadingLogin = useSelector(
    (state) => state.authSlice.loadingLogin
  );
    const dispatch = useDispatch();
    const formik = useFormik({
        initialValues: {
          email: "",
          password: "",
        },
        validationSchema: schema,
        onSubmit: (values) => {
          dispatch(login(values))
        },
      });

  return (
    <div className="login-container" >
      <h1>Login page</h1>
        <div className="login-warpper" >
            <div>
                <label>Email:</label>
                <input
                placeholder="Email"
                // className={`form-input ${emailError && "invalid-input"}`}
                type="email"
                value={formik.values.email}
                onChange={formik.handleChange}
                name="email"
                />
            </div>
            <div>
                <label>Password:</label>
                <input
                placeholder="Min 6 characters longs"
                // className={`form-input ${emailError && "invalid-input"}`}
                type="password"
                value={formik.values.password}
                onChange={formik.handleChange}
                name="password"
                />
            </div>
            {
                loadingLogin ? <p>Loading...</p> : <button onClick={formik.handleSubmit}> Login </button> 
            }
            <div>
            {formik.errors.email && <p>Email error: {formik.errors.email}</p>}
            {formik.errors.password && <p>Pass error: {formik.errors.password}</p>}
            </div>
        </div>
    </div>
  );
};

export default Login;
