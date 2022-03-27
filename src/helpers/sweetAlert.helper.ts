import { SweetAlertIconType } from "../interfaces/helper/sweetAlert/sweetAlert.type"
import Swal, { SweetAlertIcon } from 'sweetalert2'

class SweetAlert {
    alert(title: string, message: string, type: SweetAlertIcon) {
        Swal.fire({
            icon: type,
            title: title,
            text: message,
            showConfirmButton: false,
            timer: 1000
        })
    }
    toast(title: string, message: string, type: SweetAlertIcon) {
        Swal.fire({
            icon: type,
            title: title,
            text: message,
            showConfirmButton: false,
            timer: 3000,
            toast: true,
            position:'top-right',
            timerProgressBar:true,
        })
    }

    question(title: string, type: SweetAlertIcon, text?: string) {
        return Swal.fire({
            title: title,
            text: text,
            icon: type,
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            return result.isConfirmed
        })
            .catch(error => error)
    }
}

const sweetAlert = new SweetAlert()
export default sweetAlert