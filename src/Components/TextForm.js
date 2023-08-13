import React, { useState } from 'react'

export default function TextForm(props) {
    const [text, setText] = useState("");
    const handleUpperClick = () => {
        let newText = text.toUpperCase();
        setText(newText);
        props.showAlert("Converted to UPPER case.","success")

    };
    const handleLowerClick = () => {
        // console.log(text);
        let newText = text.toLowerCase();
        setText(newText);
        props.showAlert("Converted to lower case.","success")
    };
    const handleExtractCombo = () => {
        // let pattern = /[\w@.+-]+:[\w!@#$%*.+-]+/gi;
        let pattern = /[\w@.+-]+:\S+/g;
        let newText = text.match(pattern)
        if (newText) {
            newText = newText.join('\n');
            // console.log(newText);
            setText(newText);
            props.showAlert("Combo Extracted Successfully.","success")
        }
        else {
            setText("");
            props.showAlert("No Combo Found.","warning")

        }
    };
    const handleSaveTxt = () => {
        // if(text === ""){
        //     props.showAlert("There is nothing to save. Please input some text.","warning");
        //     return
        // }
        const element = document.createElement('a');
        const file = new Blob([text], { type: 'text/plain' });
        element.href = URL.createObjectURL(file);
        element.download = 'mytextfile.txt';
        document.body.appendChild(element);
        element.click();
        document.body.removeChild(element);
    };
    const handleCopy = (event) => {
        // setText("");
        document.getElementById('exampleFormControlTextarea1').select();
        navigator.clipboard.writeText(text);
        props.showAlert("Text Copied to Clipboard.","success")

    };
    const handleReset = () => {
        setText("");
        props.showAlert("Cleared the Text Area.","success")

    };

    const onChangeEvent = (event) => {
        setText(event.target.value)
    }
    return (
        <>
            <div>
                <h2 className='mt-3'>{props.heading}</h2>
                <div className="mb-3">
                    <textarea className={`form-control ${props.mode === 'light' ? 'placeholder-light' : 'placeholder-dark'}`} style={{backgroundColor:props.mode==='light'?'white':'rgb(45 38 133)',color:props.mode==='light'?'black':'white'}} placeholder="Enter your text here" value={text} onChange={onChangeEvent} id="exampleFormControlTextarea1" rows="8"></textarea>
                </div>
                <button disabled={text.length===0} className="btn btn-primary mx-1 my-1" onClick={handleUpperClick} >Convert To Upper Case</button>
                <button disabled={text.length===0} className="btn btn-primary mx-1 my-1" onClick={handleLowerClick} >Convert To Lower Case</button>
                <button disabled={text.length===0} className="btn btn-primary mx-1 my-1" onClick={handleExtractCombo} >Extract Combo</button>
                <button disabled={text.length===0} className="btn btn-primary mx-1 my-1" onClick={handleCopy} >Copy to Clipboard</button>
                <button disabled={text.length===0} className="btn btn-primary mx-1 my-1" onClick={handleSaveTxt} >Save Txt</button>
                <button disabled={text.length===0} className="btn btn-primary mx-1 my-1" onClick={handleReset} >Reset</button>
            </div>
            <h2 className='mt-2'>Text Summary</h2>
            {/* <p>{text.length>0?text.trim().split(/\s+|\n+/).length:0} words, {text.length} characters</p> */}
            <p>{text.split(/\s+|\n+/).filter(element=>{return element.length !==0}).length} words, {text.length} characters</p>
        </>
    )
}
