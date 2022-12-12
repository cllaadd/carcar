import Appointment from "./Appointment";

const VIPBadge = ({appointment}) => (
        <Badge bg={appointment.vip ? "info" : "light"}>{appointment.vin}</Badge>
    );
