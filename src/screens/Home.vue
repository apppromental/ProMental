<template>
	<v-container fill-height fluid primary>
		<v-layout row wrap 
			justify-center align-center  
			class="mx-auto white--text flex-row-reverse">
			
			<v-flex class="border" xs8 sm4 >
				<v-img contain min-height="150px" max-height="360px" class="" src="./../assets/head.svg" />
			</v-flex>
			
			<v-flex id='textoAqui' class="mx-4" xs12 sm12 md6> 
				<p id='titulo' class="border mb-md-10 text-h5 text-sm-h3 text-md-h3 font-weight-bold" style="text-align:center">
					{{headLine}}
				</p>
				<p id='texto' class="border mx-2 text-body-1 text-sm-h5 font-weight-regular" style="text-align:center">{{startText}}</p>
			</v-flex>

			<v-flex class="border mx-4 mb-2" xs12 sm12 md6>
					<v-btn 
						block
						dark 
						height="56px"
						outlined 
						rounded 
						class="button"
						router :to="startFormPage" >
						Clique aqui para começar
					</v-btn>
			</v-flex>
		</v-layout>
	</v-container>
 
</template>

<script>
import questionsBank from './../data_center/questions.js'
export default {
	components: {},

	data: () => ({
		menu: 'mdi-menu',
		teste: [],
		startFormPage: '/formScreenData',
		startText: "Cansaço, irritabilidade, insônia. Podem ser sintomas de stress.<br>Visando o seu bem estar, nós preparamos um questionario de saúde mental, que tal começarmos? Não tomará muito tempo.",
		headLine: "Bem Vindo ao ProMental",
	}),

	methods: {
	},

	mounted(){
		this.$firebase.firestore().collection('boas-vindas').get().then((snapshot) =>{
			snapshot.docs.forEach( doc => {
				this.headLine = doc.data().titulo
				document.getElementById('titulo').innerHTML = this.headLine;
				this.startText = doc.data().text1
				document.getElementById('texto').innerHTML = this.startText;
			});
		});
        this.$firebase.firestore().collection('dicas-de-saude').get().then((snapshot) =>{
            snapshot.docs.forEach( doc => {
				questionsBank.healthTips.active = doc.data().ativo;
				questionsBank.healthTips.tips = doc.data().dicas;
			});
		});
		this.$firebase.firestore().collection('questionario').get().then((snapshot) =>{
			var index = 1;
			snapshot.docs.forEach( doc => {
				questionsBank.questionary.questions[index].ask = doc.data().perguntas;
				questionsBank.questionary.questions[index].answare = doc.data().respostas;
				index--;
			});
		});
	}

};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.border {
    /* border: 1px solid black; */
}
.father-container2 {
  align-content: space-around;
}
.father-container {
  display: flex;
  flex-flow: wrap;
  
}
</style>
