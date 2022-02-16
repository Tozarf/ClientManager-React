import { useState, useEffect } from "react";
import { Client } from "../components/Client";

export const HomePage = () => {
    const [clients, setClients] = useState([]);

    useEffect(() => {
        const getClients = async () => {
            try {
                const url = "http://localhost:3000/clients";
                const response = await fetch(url);
                const result = await response.json();

                setClients(result);
            } catch (error) {
                console.log(error);
            }
        };
        getClients();
    }, []);

    const handleDelete = async (id) => {
        const confirmDeletion = confirm(
            "Would you like to delete this client?"
        );
        if (confirmDeletion) {
            try {
                const url = `http://localhost:3000/clients/${id}`;
                const response = await fetch(url, {
                    method: "DELETE",
                });
                await response.json();

                const clientsArray = clients.filter(
                    (client) => client.id !== id
                );
                setClients(clientsArray);
            } catch (error) {
                console.log(error);
            }
        }
    };
    return (
        <>
            <h1 className="font-black text-4xl text-blue-900 ">Clients</h1>
            <p className="mt-3">Manage your clients</p>
            <table className="w-full mt-5 table-auto shadow bg-white">
                <thead className="bg-blue-800 text-white">
                    <tr>
                        <th className="p-2">Name</th>
                        <th className="p-2">Contact</th>
                        <th className="p-2">Enterprise</th>
                        <th className="p-2">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {clients.map((client) => (
                        <Client
                            key={client.id}
                            client={client}
                            handleDelete={handleDelete}
                        />
                    ))}
                </tbody>
            </table>
        </>
    );
};
