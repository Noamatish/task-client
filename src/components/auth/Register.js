import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import * as yup from "yup";
import { register } from "../../slices/authSlice";

const schema = yup.object().shape({
    email: yup.string().required().email(),
    password: yup.string().min(6, "Too Short!").required("Required"),
  });
const Register = () => {
    const loadingRegister = useSelector(
        (state) => state.authSlice.loadingRegister
      );
    const dispatch = useDispatch();
    const formik = useFormik({
        initialValues: {
          email: "",
          password: "",
        },
        validationSchema: schema,
        onSubmit: (values) => {
            dispatch(register(values))
        },
      });

  return (
    <div className="register-container" >
      <h1>Register page</h1>
        <div className="register-warpper" >
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
                loadingRegister ? <p>Loading...</p> : <button onClick={formik.handleSubmit}> Register </button> 
            }
            <div>
            {formik.errors.email && <p>Email error: {formik.errors.email}</p>}
            {formik.errors.password && <p>Pass error: {formik.errors.password}</p>}
            </div>
        </div>
    </div>
  );
};

export default Register;
