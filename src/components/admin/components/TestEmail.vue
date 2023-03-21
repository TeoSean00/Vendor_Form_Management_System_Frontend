<template>
    <!-- <form ref="form" @submit.prevent="sendEmail">
      <label>Name</label>
      <input type="text" name="user_name">
      <label>Email</label>
      <input type="email" name="user_email">
      <label>Message</label>
      <textarea name="message"></textarea>
      <input type="submit" value="Send">
    </form> -->
    <button @click="sendEmail">
        Send Email
    </button>
  </template>
  
  <script>
  import emailjs from '@emailjs/browser';
  
  export default {
    props:{
        // vendorEmail,
        formDueDate: "",
        vendorName : "",
    },
    setup(props) {

        const sendEmail = () => {
            emailjs.send("service_xquebpj","template_87ifsho",
            {
                to_name: props.vendorName,
                send_to: "arcapolis@gmail.com",
                dueDate: props.formDueDate,
            },
            "Qubr9KRvmmD-pLaFH")
            .then((result) => {
                console.log('SUCCESS!', result.text);
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