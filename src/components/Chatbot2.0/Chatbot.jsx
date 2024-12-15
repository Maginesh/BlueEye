import React, {Component } from 'react';
import { PropTypes } from 'prop-types';
import ChatBot from 'react-simple-chatbot';
import { ThemeProvider } from 'styled-components';
// import translate from 'translate';
// import Loader from './Loader';
import Translator from './Translator';
import vishu from './vishu.png';
import AttachFile from './AttachFile';
import SelectOption from './SelectOption';
import SelectDistrict from './SelectDistrict';
import SelectDwlrid from './SelectDwlrid';
import SelectWellType from './SelectWellType';
import SingleModal from './SingleModal';
import SelectBlock from './SelectBlock';
import Details from './Details';
import DataAnalysis from './DataAnalysis';

class Review extends Component {
  constructor(props) {
    super(props);
    this.state = {
      date: null,
    };
  }

  componentWillMount() {
    const { steps } = this.props;
    const {date} = steps;

    this.setState({ date });
  }

  render() {
    const { date } = this.state;
    return (
      <SingleModal date = {date}/>
    );
  }
}
Review.propTypes = {
  steps: PropTypes.object,
};

Review.defaultProps = {
  steps: undefined,
};

const Chatbot = ({ lang }) => {
  

  const theme = {
    background: '#f5f8fb',
    headerBgColor: '#346980',
    headerFontColor: '#f5f8fb',
    headerFontSize: '17px',
    botBubbleColor: 'rgba(255, 255, 255, 0.5);',
    botFontColor: 'black',
    userBubbleColor: '#346980',
    userFontColor: '#ffff',
  };

  const bubbleStyle = {
    fontFamily: 'Arial, Helvetica, sans-serif',
  };

  const bubbleOptionStyle = {
    marginLeft: '20px',
    color: '#fff',
    fontFamily: 'Arial, Helvetica, sans-serif',
    backgroundColor: '#346980'
  };

  const contentStyle = {
    maxHeight: '700px',
    maxWidth: '450px',
  };

  const config = {
    floating: true,
    width: '500px',
  };

  return (
    <div>
      <ThemeProvider theme={theme}>
        <ChatBot
          recognitionEnable={true}
          botAvatar={vishu}
          enableSmoothScroll={true}
          recognitionLang={lang}
          floatingIcon={vishu}
          floating={true}
          style={contentStyle}
          bubbleStyle={bubbleStyle}
          bubbleOptionStyle={bubbleOptionStyle}
          speechSynthesis={{ enable: true, lang: { lang } }}
          headerTitle="BlueEye - VISHU"
          steps = {[
            {
             id: 'start',
             options: [
               { value: 1, label: 'Start Conversation', trigger: '0' }
             ]
            },
            {
              id: '0',
              component: <Translator text = 'Hi!! I am VISHU.. - Guidance Chatbot. I am here to help you.' targetLang = {lang}/>,
              asMessage: true,
              trigger: '1'
            },
            {
              id: '1',
              component: <Translator text = 'Select any one of The below Services' targetLang = {lang}/>,
              asMessage: true,
              trigger: '2',
            },
            {
              id: '2',
              options: [
                // { value: 1, label: 'Get Details', trigger: '3' },
                // { value: 2, label: 'Update DWLR Data', trigger: '11' },
                { value: 1, label: 'Get Information', trigger: '18' },
              ],
            },
            {
              id: '18',
              component: <Translator text = 'Choose the DWLR ID' targetLang = {lang}/>,
              asMessage: true,
              trigger: '19',
            },
            {
              id: '19',
              component: <SelectDwlrid />,
            },

            {
              id: 'dataEnter',
              component: <Translator text = 'Enter date between September 24 and October 31' targetLang = {lang}/>,
              asMessage: true,
              trigger: 'date',
            },
            {
              id: 'date',
              user: true,
              validator: (value) => {

                const dateRegex = /^(0[1-9]|1[0-2])\/(0[1-9]|[12][0-9]|3[01])\/(\d{4})$/;
            
                if (!dateRegex.test(value)) {
                  return 'Enter a valid date in MM/DD/YYYY format';
                }
            
                const [month, day, year] = value.split('/').map(Number);
                const date = new Date(year, month - 1, day);
                if (
                  date.getFullYear() !== year ||
                  date.getMonth() + 1 !== month ||
                  date.getDate() !== day
                ) {
                  return 'Enter a valid date';
                }
            
                // Validate the date range
                const minDate = new Date(2023, 8, 24); 
                const maxDate = new Date(2023, 9, 31); 
            
                if (date < minDate || date > maxDate) {
                  return 'Date must be between 9/24/2023 and 10/31/2023';
                }
            
                return true;
              },
              trigger: 'getInfo',
            },
            {
              id: 'getInfo',
              delay: 10000,
              component: <Review />,
              asMessage: true,
              trigger: '1'
            },
            
            // {
            //   id: '20',
            //   component: <Translator text = 'Choose the Well Type' targetLang = {lang}/>,
            //   asMessage: true,
            //   trigger: '21',
            // },
            // {
            //   id: '21',
            //   component: <SelectWellType/>,
            // },

            // 32
            
            
        ]}
          {...config}
        />
      </ThemeProvider>
    </div>
  );
};

Chatbot.propTypes = {
  lang: PropTypes.string.isRequired
};

export {Chatbot};
