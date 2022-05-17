import React from 'react'
import { NavLink } from 'react-bootstrap'

function Footer() {
    return (
        <>
            <NavLink href="/dashboard" className="btn btn-icon btn-circle btn-success btn-scroll-to-top fade" data-click="scroll-top"><i className="fa fa-angle-up"></i></NavLink>
        </>
    )
}

export default Footer
