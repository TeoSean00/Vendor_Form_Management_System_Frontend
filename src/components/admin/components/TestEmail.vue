<template>
    <button class="btn btn-primary">
        Remind
    </button>
  </template>
  
  <script>
  import emailjs from '@emailjs/browser';
  
  export default {
    props:["vendorEmail", "formDueDate","vendorName","vendorUsers"],

    setup(props) {

        const sendEmail = () => {
            emailjs.send("service_xquebpj","template_87ifsho",
            {
                to_name: props.vendorName,
                send_to: "#",
                dueDate: props.formDueDate,
            },
            "Qubr9KRvmmD-pLaFH")
            .then((result) => {
            }, (error) => {
                console.log('FAILED...', error.text);
            });
        }

        return{
            sendEmail,
            props
        }
    }
  }
  </script>