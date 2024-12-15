import React from 'react';
import translate from 'translate';

class Translator extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      translatedText: '',
    };
    this.triggerNextStep = props.triggerNextStep;
    this.text = props.text;
    this.targetLang = props.targetLang;
  }

  async translateText() {
    const translatedText = await translate(this.text, { to: this.targetLang });
    this.setState({ translatedText });

    const msg = new window.SpeechSynthesisUtterance();
    msg.text = translatedText;
    msg.lang = this.targetLang;
    window.speechSynthesis.speak(msg);
    if(this.text === 'No other Departments are related to your Grievance')
      this.triggerNextStep({ value: 'no_dept', trigger: '13' });
    return translatedText;
  }

  componentDidMount() {
    this.translateText();
  }

  render() {
    return (
        <span>{this.state.translatedText}</span>
    );
  }
}

export default Translator;