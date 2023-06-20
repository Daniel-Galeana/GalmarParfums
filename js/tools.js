const SAlertToast = (position, timmer, icon, title) => {
    const Success = Swal.mixin({
        toast: true,
        position: position,
        showConfirmButton: false,
        timer: timmer,
        timerProgressBar: true,
        didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer)
            toast.addEventListener('mouseleave', Swal.resumeTimer)
        }
    });
    Success.fire({
        icon: icon,
        title: title
    });
};

const SAlertMessage = (position, icon, title, timer, confirmButton) => {
    Swal.fire({
        position: position,
        icon: icon,
        title: title,
        timer: timer,
        showConfirmButton: confirmButton
    });
};

const ReadJson = async (JsonUrl) => {
    let result = {};
    await fetch(JsonUrl)
        .then(res => res.json())
        .catch(error => {
            console.log('File not found')
        })
        .then(response => {
            result = response;
        });
    return result;
};