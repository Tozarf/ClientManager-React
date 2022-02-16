import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Form } from "../components/Form";

export const EditClient = () => {
    const [client, setClient] = useState({});
    const [loading, setLoading] = useState(true);
    const { id } = useParams();

    useEffect(() => {
        const getClientAPI = async () => {
            try {
                const url = `http://localhost:3000/clients/${id}`;
                const response = await fetch(url);
                const result = await response.json();
                setClient(result);
            } catch (error) {
                console.log(error);
            }
            setLoading(!loading);
        };
        getClientAPI();
    }, []);

    return (
        <>
            <h1 className="font-black text-4xl text-blue-900 ">Edit Client</h1>
            <p className="mt-3">
                Fill the following fields with the new values
            </p>
            {client?.name ? (
                <Form client={client} loading={loading} />
            ) : (
                <p className="text-3xl text-gray-800 mt-11 text-center uppercase font-bold">
                    Client not found
                </p>
            )}
        </>
    );
};
