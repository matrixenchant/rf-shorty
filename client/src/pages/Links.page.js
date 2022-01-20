import React, { useCallback, useContext, useEffect, useState } from "react";
import { LinksList } from "../components/LinksList";
import { Loader } from "../components/Loader";
import { AuthContext } from "../context/Auth.context";
import { useHttp } from "../hooks/http.hook";

export const LinksPage = () => {
    const [links, setLinks] = useState([])
    const {loading, request} = useHttp()
    const {token} = useContext(AuthContext)

    const fetchedLinks = useCallback(async () => {
        try {
            const Authorization = `Bearer ${token}`
            const data = await request('http://localhost:5000/api/link', 'GET', null, {Authorization})
            setLinks(data)
        } catch (e) {}
    }, [token, request])

    useEffect(() => {
        fetchedLinks()
    }, [fetchedLinks])

    if (loading) {
        return <Loader />
    }

    return (
        <div>
            {!loading && <LinksList links={links} />}
        </div>
    )
}