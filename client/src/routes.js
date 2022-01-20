import React from "react"
import { Routes, Route, Navigate } from 'react-router-dom'
import { AuthPage } from "./pages/Auth.page"
import { CreateLinkPage } from "./pages/CreateLink.page"
import { DetailPage } from "./pages/Detail.page"
import { LinksPage } from "./pages/Links.page"
import { StartPage } from "./pages/Start.page"

export const useRoutes = (isAuthenticated) => {
    if (isAuthenticated) {
        return (
            <Routes>
                <Route path="links" element={<LinksPage />} />
                <Route path="create" element={<CreateLinkPage />} />
                <Route path="detail/:id" element={<DetailPage />} />
                <Route path="*" element={<UnknownPage index="create" />} />
            </Routes>
        )
    }

    return (
        <Routes>
            <Route path="/" element={<StartPage />} />
            <Route path="auth" element={<AuthPage />} />
            <Route path="*" element={<UnknownPage index="/" />} />
        </Routes>
    )
}

const UnknownPage = ({ index }) => {
    return (
        <Navigate to={index} />
    )
}