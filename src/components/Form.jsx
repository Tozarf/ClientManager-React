import { Field, Form as Formulario, Formik } from "formik";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { Alert } from "./Alert";
import { Spinner } from "./Spinner";

export const Form = ({ client, loading }) => {
    const navigate = useNavigate();

    const newClientsSchema = Yup.object().shape({
        name: Yup.string()
            .min(3, "Name is too short")
            .max(40, "Name is too large")
            .required("Client name is required"),
        company: Yup.string().required("Company name is required"),
        email: Yup.string().email().required("Email is required"),
        phone: Yup.number()
            .integer("Invalid number")
            .positive("Invalid number")
            .typeError("Invalid number"),
    });

    const handleSubmit = async (values) => {
        try {
            let response;
            if (client.id) {
                const url = `http://localhost:3000/clients/${client.id}`;
                response = await fetch(url, {
                    method: "PUT",
                    body: JSON.stringify(values),
                    headers: {
                        "Content-Type": "application/json",
                    },
                });
            } else {
                // New Registry
                const url = "http://localhost:3000/clients";
                response = await fetch(url, {
                    method: "POST",
                    body: JSON.stringify(values),
                    headers: {
                        "Content-Type": "application/json",
                    },
                });
            }

            await response.json();

            navigate("/clients");
        } catch (error) {
            console.log(error);
        }
    };
    return loading ? (
        <Spinner />
    ) : (
        <div className="bg-white mt-10 px-5 py-10 rounded-md shadow-md md:w-3/4 mx-auto">
            <h1 className="text-gray-600 font-bold text-xl uppercase text-center">
                {client?.name ? "Edit Client" : "Add Client"}
            </h1>
            <Formik
                initialValues={{
                    name: client?.name ?? "",
                    company: client?.company ?? "",
                    email: client?.email ?? "",
                    phone: client?.phone ?? "",
                    notes: client?.notes ?? "",
                }}
                enableReinitialize={true}
                onSubmit={async (values, { resetForm }) => {
                    await handleSubmit(values);

                    resetForm();
                }}
                validationSchema={newClientsSchema}
            >
                {({ errors, touched }) => {
                    return (
                        <Formulario className="mt-10">
                            <div className="mb-4">
                                <label className="text-gray-800" htmlFor="name">
                                    Name:{" "}
                                </label>
                                <Field
                                    id="name"
                                    type="text"
                                    className="mt-2 block w-full p-3 bg-gray-50"
                                    placeholder="Client Name"
                                    name="name"
                                />
                                {errors.name && touched.name ? (
                                    <Alert>{errors.name}</Alert>
                                ) : null}
                            </div>
                            <div className="mb-4">
                                <label
                                    className="text-gray-800"
                                    htmlFor="company"
                                >
                                    Company:{" "}
                                </label>
                                <Field
                                    id="company"
                                    type="text"
                                    className="mt-2 block w-full p-3 bg-gray-50"
                                    placeholder="Client's Company"
                                    name="company"
                                />
                                {errors.company && touched.company ? (
                                    <Alert>{errors.company}</Alert>
                                ) : null}
                            </div>
                            <div className="mb-4">
                                <label
                                    className="text-gray-800"
                                    htmlFor="email"
                                >
                                    E-mail:{" "}
                                </label>
                                <Field
                                    id="email"
                                    type="email"
                                    className="mt-2 block w-full p-3 bg-gray-50"
                                    placeholder="E-mail"
                                    name="email"
                                />
                                {errors.email && touched.email ? (
                                    <Alert>{errors.email}</Alert>
                                ) : null}
                            </div>
                            <div className="mb-4">
                                <label
                                    className="text-gray-800"
                                    htmlFor="Phone Number"
                                >
                                    Phone Number:{" "}
                                </label>
                                <Field
                                    id="Phone Number"
                                    type="tel"
                                    className="mt-2 block w-full p-3 bg-gray-50"
                                    placeholder="Client's Phone Number"
                                    name="phone"
                                />
                                {errors.phone && touched.phone ? (
                                    <Alert>{errors.phone}</Alert>
                                ) : null}
                            </div>
                            <div className="mb-4">
                                <label
                                    className="text-gray-800"
                                    htmlFor="notes"
                                >
                                    Notes:{" "}
                                </label>
                                <Field
                                    as="textarea"
                                    id="notes"
                                    type="text"
                                    className="mt-2 block w-full p-3 bg-gray-50 h-40"
                                    placeholder="Client's Notes"
                                    name="notes"
                                />
                            </div>
                            <input
                                type="submit"
                                value={
                                    client?.name ? "Edit Client" : "Add Client"
                                }
                                className="mt-5 w-full bg-blue-800 p-3 text-white uppercase font-bold text-lg"
                            />
                        </Formulario>
                    );
                }}
            </Formik>
        </div>
    );
};

Form.defaultProps = {
    client: {},
    loading: false,
};
