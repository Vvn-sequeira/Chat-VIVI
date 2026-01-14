import { Client } from "@gradio/client";
	

export const  resImg = async(User_prompt)=>{
  console.log("triggerdd the function")
	try {
        const client = await Client.connect("mrfakename/Z-Image-Turbo");
	    const result = await client.predict("/generate_image", { 		
			// prompt: "Astronaut riding a horse on Mars, cinematic lighting, sci-fi concept art, highly detailed", 
			prompt: User_prompt, 
								
			height: 1152, 
								
			width: 1024, 
								
			num_inference_steps: 9, 
								
			seed: 42, 
								
			randomize_seed: true, 
						
	});
	console.log("senniding the result back ")
    return result
	// console.log(result.data);
    } catch (error) {
       console.log("error",error) 
	   
    }
}
