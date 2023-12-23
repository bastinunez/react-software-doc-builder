import React, { useState, useRef } from 'react';
import { useNavigate, useLocation} from "react-router-dom";
import { Editor } from '@tinymce/tinymce-react';

const SeccionDocumento = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const modulo = location.state.proyecto.proyectoPK;
  const proyecto = location.state.proyecto;

	const editorRef = useRef(null);
	const [texto, setTexto] = useState('');

  const handleSendToDb = async () => {
    console.log("Aqui hay que enviar el texto a la base de datos");
  }


	const getTexto = () => {
		if (editorRef.current) {
			const contenido = editorRef.current.getContent();
      console.log(contenido)
      setTexto(contenido);
		}
	};

  const volver = () => {
    navigate("/estudiante/modulos/proyectos",{state:{modulo:modulo}})  
  }

	return (
		<>
      <button className='btn btn-primary' onClick={volver}>Volver atrás</button>
			
      <div className='d-flex flex-column align-items-center'>
        <h2>Sección del documento</h2>
				<Editor
					apiKey='5y8ozf4cum6qejhchua9hecdf7zunldojpqge7nlxsbp1186'
					onInit={(evt, editor) => (editorRef.current = editor)}
					init={{
						plugins:
							'ai tinycomments mentions anchor autolink charmap codesample emoticons image link lists media searchreplace table visualblocks wordcount checklist mediaembed casechange export formatpainter pageembed permanentpen footnotes advtemplate advtable advcode editimage tableofcontents mergetags powerpaste tinymcespellchecker autocorrect a11ychecker typography inlinecss',
						toolbar:
							'undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table mergetags | align lineheight | tinycomments | checklist numlist bullist indent outdent | emoticons charmap | removeformat',
						tinycomments_mode: 'embedded',
						tinycomments_author: 'Author name',
						mergetags_list: [
							{ value: 'First.Name', title: 'First Name' },
							{ value: 'Email', title: 'Email' },
						],
						ai_request: (request, respondWith) =>
							respondWith.string(() => Promise.reject('See docs to implement AI Assistant')),
					}}
					initialValue=''
				/>

			  <button onClick={getTexto}>Obtener texto</button>
			
      </div>

		</>
	);
};

export default SeccionDocumento;
