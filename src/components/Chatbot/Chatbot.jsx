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
import SingleModal from './SingleModal';
import Details from './Details';

class Review extends Component {
  constructor(props) {
    super(props);
    this.state = {
      date1: null,
      date2: null,
    };
  }

  componentWillMount() {
    const { steps } = this.props;
    const { date1, date2} = steps;
    this.setState({ date1, date2 });
    console.log(date1)
    console.log(date2)
  }

  render() {
    const { date1, date2} = this.state;
    return (
      <>
      { date1 ?
        (
          <Details date = {date1.value}/>
        ) : (
          <Details date = {date2.value}/>
        )
      }
      </>
    );
  }
}
Review.propTypes = {
  steps: PropTypes.object,
};

Review.defaultProps = {
  steps: undefined,
};

class Review1 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      date3: null,
      date4: null,
    };
  }

  componentWillMount() {
    const { steps } = this.props;
    const { date3, date4} = steps;
    this.setState({ date3, date4});
    console.log(date3)
    console.log(date4)
  }

  render() {
    const { date3, date4} = this.state;
    return (
      <>
      { date3 ?
        (
          <SingleModal date = {date3.value}/>
        ) : (
          <SingleModal date = {date4.value}/>
        )
      }
      </>
    );
  }
}
Review1.propTypes = {
  steps: PropTypes.object,
};

Review1.defaultProps = {
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
                { value: 1, label: 'Get Details', trigger: '3' },
                { value: 2, label: 'Update DWLR Data', trigger: '11' },
                { value: 3, label: 'Check DWLR', trigger: '41' },
              ],
            },
            {
              id: '3',
              component: <Translator text = 'Choose the state of the DWLR' targetLang = {lang}/>,
              asMessage: true,
              trigger: '4',
            },
            {
              id: '4',
              component: <SelectOption id = {1}/>,
            },
            {
              id: '5',
              component: <Translator text = 'Choose the Telemetry UID' targetLang = {lang}/>,
              asMessage: true,
              trigger: '6',
            },
            {
              id: '6',
              component: <SelectDistrict id = {1}/>,
            },
            {
              id: 'dataEnter1',
              component: <Translator text = 'Enter date between October 1 and November 30 2023' targetLang = {lang}/>,
              asMessage: true,
              trigger: 'date1',
            },
            {
              id: 'date1',
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

                date.setHours(0, 0, 0, 0);

                const minDate = new Date(2023, 9, 1);
                minDate.setHours(0, 0, 0, 0); 

                const maxDate = new Date(2023, 10, 30); 
                maxDate.setHours(23, 59, 59, 999); 

                if (date < minDate || date > maxDate) {
                  return 'Date must be between 10/01/2023 and 11/30/2023';
                }

                return true;
              },
              trigger: 'getInfo'
            },
            {
              id: 'dataEnter2',
              component: <Translator text = 'Enter date between July 1 and August 31 2024' targetLang = {lang}/>,
              asMessage: true,
              trigger: 'date2',
            },
            {
              id: 'date2',
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
            
                // Explicitly set time to 00:00:00
                const minDate = new Date(2024, 6, 1); // July 1, 2024
                minDate.setHours(0, 0, 0, 0);
                const maxDate = new Date(2024, 7, 31); // August 31, 2024
                maxDate.setHours(23, 59, 59, 999);
            
                if (date < minDate || date > maxDate) {
                  return 'Date must be between 07/01/2024 and 08/31/2024';
                }
            
                return true;
              },
              trigger: 'getInfo',
            },
            {
              id: 'getInfo',
              delay: 10000,
              component: <Review id = {1}/>,
              asMessage: true,
              trigger: '1'
            },
            {
              id: '11',
              component: <Translator text = 'Upload your Excel file' targetLang = {lang}/>,
              asMessage: true,
              trigger: '12',
            },
            {
              id: '12',
              component: <AttachFile/>
            },
            {
              id: '13',
              message: '{previousValue}',
              trigger: '1',
            },
            {
              id: '41',
              component: <SelectOption id = {2}/>,
            },

            {
              id: '18',
              component: <Translator text = 'Choose the Telemetry UID' targetLang = {lang}/>,
              asMessage: true,
              trigger: '19',
            },
            {
              id: '19',
              component: <SelectDistrict id = {2}/>,
            },
            {
              id: 'dataEnter12',
              component: <Translator text = 'Enter date between October 1 and November 30 2023' targetLang = {lang}/>,
              asMessage: true,
              trigger: 'date3',
            },
            {
              id: 'date3',
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

                date.setHours(0, 0, 0, 0);

                const minDate = new Date(2023, 9, 1);
                minDate.setHours(0, 0, 0, 0); 

                const maxDate = new Date(2023, 10, 30); 
                maxDate.setHours(23, 59, 59, 999); 

                if (date < minDate || date > maxDate) {
                  return 'Date must be between 10/01/2023 and 11/30/2023';
                }

                return true;
              },
              trigger: 'getInfo1'
            },
            {
              id: 'dataEnter22',
              component: <Translator text = 'Enter date between July 1 and August 31 2024' targetLang = {lang}/>,
              asMessage: true,
              trigger: 'date4',
            },
            {
              id: 'date4',
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
            
                // Explicitly set time to 00:00:00
                const minDate = new Date(2024, 6, 1); // July 1, 2024
                minDate.setHours(0, 0, 0, 0);
                const maxDate = new Date(2024, 7, 31); // August 31, 2024
                maxDate.setHours(23, 59, 59, 999);
            
                if (date < minDate || date > maxDate) {
                  return 'Date must be between 07/01/2024 and 08/31/2024';
                }
            
                return true;
              },
              trigger: 'getInfo1',
            }, 
            {
              id: 'getInfo1',
              delay: 5000,
              component: <Review1 id = {2}/>,
              asMessage: true,
              trigger: '1'
            },
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
