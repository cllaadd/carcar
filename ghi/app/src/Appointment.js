import React from "react";
import { useState, useEffect } from "react";

export default function Appointment(owner, date, time, technician, reason) {

    return (
         <>
        <td>{owner}</td>
        <td>{date}</td>
        <td>{time}</td>
        <td>{technician.name}</td>
        <td>{reason}</td>
        </>
            )
        }
