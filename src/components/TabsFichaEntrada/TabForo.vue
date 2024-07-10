<template>
    	<div class="col l12">
            <div class="card z-depth-2 hoverable">
                <div class="mainBody">
                    <div class="foroHeader">
                        <div class="headerArea">
                            <span>Foro de Discusión</span>
                            <span>PDVSA</span>
                        </div>
                    </div>
                    <div class="divider"></div>
                    <div class="foroBody" ref="foroBody">
                        <div class="card-content">
                            <div v-for="(msg, index) in mensajes" :key="index" class="message">
                                <div class="userMessage">
                                    <div class="messageInfo">
                                        <div class="colorCircle"></div>
                                        <span class="userName">
                                            Gabriel Marquez
                                        </span>
                                        <span class="messageDate">
                                            {{ msg.date}}
                                        </span>
                                    </div>
                                    <div class="messageText">
                                        <span>
                                            {{ msg.text }}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="h-line"></div>
                    <div class="foroInput">
                        <textarea ref="message" v-model="message" @keypress.enter.prevent="enviarText" maxlength="700" class="foroTextArea" placeholder="Escribe tu mensaje..."></textarea>
                        <a class="btn enviarText" @click="enviarText">
                            <i class="material-icons">
                                send
                            </i>
                        </a>
                    </div>
                </div>
            </div>
        </div>
</template>

<script>
export default {
    data() {
        return {
            message: '',
            mensajes: [],
            todayDate:  new Date(),
        }
    },
    methods: {
        enviarText() {
            if (this.message.trim() !== '') {
                const newMessage = {
                    text: this.message,
                    date: new Date().toLocaleString()
                };
                this.mensajes.push(newMessage);
                this.message = '';  
                this.scrollToBottom();
                this.$refs.message.focus();
            }
        },
        scrollToBottom() {
            this.$nextTick(() => {
                const foroBody = this.$refs.foroBody;
                foroBody.scrollTop = foroBody.scrollHeight;
            });
        }
    }
}
</script>

<style scoped>
    .mainBody{
        border: 1px solid rgb(52, 52, 97);
        background-color: rgb(252, 248, 248);
        max-height: 700px;
    }
    .foroHeader{
        background-color: rgb(52, 52, 97);
        height: 55px;
    }
    .headerArea{
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 10px 30px 10px 30px;
        scrollbar-width: none;
    }
    .headerArea span{
        color: white;
        font-size: 26px;
        font-weight: 700;
        letter-spacing: 2px;
    }

    .foroBody{
        height: 450px;
        overflow-y: scroll;
    }
    .foroBody .card-content{
        height: 100%;
        width: 100%;
    }

    .userMessage{
        display: flex;
        flex-direction: column;
        gap: 5px;
        max-width: 70%;
        margin: 10px;
    }
    .messageInfo{
        display: flex;
        align-items: baseline;
        gap: 5px;
        margin: 0;
        padding: 0;
    }
    .messageInfo .colorCircle{
        width: 8px;
        height: 8px;
        border-radius: 100%;
        background-color: rgb(52, 52, 97);
    }
    .messageInfo .userName{
        font-weight: 700;
        font-size: 12px;
    }
    .messageInfo .messageDate{
        margin-left: 5px;
        font-size: 11px;
        color: rgb(172, 172, 172);
    }
    .messageText span{
        background-color: rgb(52, 52, 97);
        border-radius: 5px;
        color: white;
        margin: 0;
        padding: 8px;
        display: inline-block;
        max-width: 100%;
        word-wrap: break-word;
    }

    .foroInput{
        height: 50px;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    .h-line{
        background-color: rgb(52, 52, 97);
        height: 1px;
        width: 100%;
    }
    .foroTextArea {
        width: 100%;
        height: 100%;
        resize: none;
        border: none;
        padding: 10px;
        box-sizing: border-box;
        font-family: inherit;
    }
    .foroTextArea:focus {
        outline: none;
    }
    .enviarText{
        border-radius: 0;
        height: 100%;
        background-color: rgb(52, 52, 97);
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .enviarText:hover{
        background-color: rgb(69, 69, 124);
    }
</style>