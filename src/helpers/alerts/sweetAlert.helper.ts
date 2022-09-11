import { SweetAlertIconType } from "../../interfaces/helper/sweetAlert/sweetAlert.type"
import Swal, { SweetAlertIcon, SweetAlertOptions } from 'sweetalert2'

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
            position: 'top-right',
            timerProgressBar: true,
        })
    }


    question(title: string, icon: SweetAlertIcon, text?: string, props?: SweetAlertOptions<any, any>) {
        return Swal.fire({
            title,
            text,
            icon,
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes',
            ...props
        }).then((result) => {
            return result.isConfirmed
        }).catch(error => error)
    }
}

const sweetAlert = new SweetAlert()
export default sweetAlert