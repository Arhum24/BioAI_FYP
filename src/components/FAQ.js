import React, { useState, useEffect } from "react";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Header from './Header';
import Tooltip from '@material-ui/core/Tooltip';
import Zoom from '@material-ui/core/Zoom';
import { Box } from '@material-ui/core';
import { Redirect } from "react-router-dom";
const useStyles = makeStyles((theme) => ({
    root: {
        width: '90%',
        marginLeft: "6%",
        marginTop: "5%"
    },
    heading: {
        fontSize: theme.typography.pxToRem(15),
        fontWeight: theme.typography.fontWeightRegular,
        textAlign: "left"
    },
}));
const LightTooltip = withStyles((theme) => ({
    tooltip: {
        backgroundColor: "#5A75D6",
        color: 'white',
        boxShadow: theme.shadows[1],
        fontSize: 11,
    },
}))(Tooltip);
export default function FAQs() {
    const classes = useStyles();
    if (!localStorage.getItem("token")) { return <Redirect to='/Autherization' /> }
    else
        return (
            <div className={classes.root}>
                <Header token={localStorage.getItem("token")} />
                <div style={{
                    backgroundColor: "#5ca0f2",
                    backgroundImage: "linear-gradient(to right, #38D4D7, #37ACEB)",
                    height: "150px",
                    textAlign: "left"
                }}><Typography style={{ textAlign: "left", fontSize: 20, marginLeft: "1rem", color: "white" }}>{<b style={{ color: "white" }}>BioAI</b>} is the use of Artificial Intelligence in the field of medical sciences. It was inspired by the idea to make a deployable AI
             solution for the analysis of Lung Diseases through Medical Imaging.
    It was designed by the the team of three consisting of {<b>Muhammad Umair, Arhum Junaid and Ghulam Meeran</b>}
                    </Typography>
                </div>
                <ExpansionPanel>
                    <ExpansionPanelSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                    >
                        <Typography className={classes.heading}>What is Lung Cancer?</Typography>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails>
                        <Typography className={classes.heading}>
                            Lung cancer, also known as lung carcinoma, is a malignant lung tumor characterized by uncontrolled cell growth in tissues of the lung.
                            This growth can spread beyond the lung by the process of metastasis into nearby tissue or other parts of the body.
                            </Typography>
                    </ExpansionPanelDetails>
                </ExpansionPanel>
                <ExpansionPanel>
                    <ExpansionPanelSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel2a-content"
                        id="panel2a-header"
                    >
                        <Typography className={classes.heading}>What types of lung disease are most common in women?</Typography>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails>
                        <Typography className={classes.heading}>
                            Three of the most common lung diseases in women are asthma, chronic obstructive pulmonary disease (COPD), and lung cancer.

                                {<h3>Asthma</h3>}
                                Asthma is a chronic (ongoing) disease of the airways in the lungs called bronchial tubes. Bronchial tubes carry air into and out of the lungs. In people with asthma, the walls of these airways become inflamed (swollen) and oversensitive. The airways overreact to things like smoke, air pollution, mold, and many chemical sprays. They also can be irritated by allergens (like pollen and dust mites) and by respiratory infections (like a cold). When the airways overreact, they get narrower. This limits the flow of air into and out of the lungs and causes trouble breathing. Asthma symptoms include wheezing, coughing, and tightness in the chest.

                                Women are more likely than men to have asthma and are more likely to die from it. The percentage of women, especially young women, with asthma is rising in the United States. Researchers are not sure why. Many experts think that air pollution and allergens play a role in this increase. Breathing tobacco smoke also is linked to an increased risk of asthma.

                                {<h3>Chronic obstructive pulmonary disease></h3>}
                                Chronic obstructive pulmonary disease (COPD) refers to chronic obstructive bronchitis and emphysema. These conditions often occur together. Both diseases limit airflow into and out of the lungs and make breathing difficult. COPD usually gets worse with time.

                                A person with COPD has ongoing inflammation of the bronchial tubes, which carry air into and out of the lungs. This irritation causes the growth of cells that make mucus. The extra mucus leads to a lot of coughing. Over time, the irritation causes the walls of the airways to thicken and develop scars. The airways may become thickened enough to limit airflow to and from the lungs. If that happens, the condition is called chronic obstructive bronchitis.

                                In emphysema, the lung tissue gets weak, and the walls of the air sacs (alveoli) break down. Normally, oxygen from the air goes into the blood through these air sac walls. In a person with emphysema, the ruined air sac walls means less oxygen can pass into the blood. This causes shortness of breath, coughing, and wheezing.

                                More than twice as many women as men are now diagnosed with chronic bronchitis. The rate of emphysema among women has increased by 5 percent in recent years but has decreased among men. And more women have died from COPD than men every year since 2000. Researchers are trying to understand why. Cigarette smoking, a main cause of COPD, has increased among women. One theory is that cigarette smoke is more damaging to women than to men.

                                {<h3>Lung cancer</h3>}
                                Lung cancer is a disease in which abnormal (malignant) lung cells multiply and grow without control. These cancerous cells can invade nearby tissues, spread to other parts of the body, or both. The two major kinds of lung cancer are named for the way the cells look under a microscope. They are:

                                Small cell lung cancer. This kind of lung cancer tends to spread quickly.
                                Non-small cell lung cancer. This is a term for several types of lung cancers that act in a similar way. Most lung cancers are non-small cell. This kind of lung cancer tends to spread more slowly than small cell lung cancer.
                                In the United States, more women now die from lung cancer than from any other type of cancer. Tobacco use is the major cause of lung cancer.

                                {<h3>Other lung diseases</h3>}
                                Less common lung problems that affect women include:

                                {<ul>
                                <li>
                                    <b>Pulmonary emboli.</b> These are blood clots that travel to the lungs from other parts of the body and plug up blood vessels in the lungs. Some factors that increase your risk include being pregnant, having recently given birth, and taking birth control pills or menopausal hormone therapy. Pulmonary emboli can affect blood flow in the lungs and can reduce oxygen flow into the blood. Very large emboli can cause sudden death.</li>
                                <li>
                                    <b>Pulmonary hypertension.</b> This is high blood pressure in the arteries that bring blood to the lungs. It can affect blood flow in the lungs and can reduce oxygen flow into the blood.</li>
                                <li>
                                    <b>Sarcoidosis and pulmonary fibrosis.</b> These inflammatory diseases cause stiffening and scarring in the lungs.</li>
                                <li>
                                    <b>AM (lymphangioleiomyomatosis) (lim-FAN-jee-oh-LEE-oh-MEYE-oh-mah-TOH-sis).</b> This is a rare lung disease that mostly affects women in their mid-30s and 40s. Muscle-like cells grow out of control in certain organs, including the lungs.</li>
                                <li>
                                    <b>Influenza (the flu) and pneumonia.</b> Flu is a respiratory infection that is caused by a virus and can damage the lungs. Usually, people recover well from the flu, but it can be dangerous and even deadly for some people. Those at greater risk include older people, young children, pregnant women, and people with certain health conditions like asthma. Pneumonia is a severe inflammation of the lungs that can be caused by bacteria, viruses, and fungi. Fluid builds up in the lungs and may lower the amount of oxygen that the blood can get from air that's breathed in. People most at risk are older than 65 or younger than 2, or already have health problems. Vaccines are the best protection against flu and pneumonia. </li></ul>}
                        </Typography>
                    </ExpansionPanelDetails>
                </ExpansionPanel>
                <ExpansionPanel>
                    <ExpansionPanelSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel2a-content"
                        id="panel2a-header"
                    >
                        <Typography className={classes.heading}>What is Lung Disease?</Typography>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails>
                        <Typography className={classes.heading}>
                            Lung disease refers to disorders that affect the lungs, the organs that allow us to breathe.
                            Breathing problems caused by lung disease may prevent the body from getting enough oxygen. Examples of lung diseases are:

                        {<ul><li>Asthma, chronic bronchitis, and emphysema</li>
                                <li> Infections, such as influenza and pneumonia</li>
                                <li> Lung cancer</li>
                                <li>Sarcoidosis (sar-KOY-doh-sis) and pulmonary fibrosis</li>
                            </ul>}

                        Lung disease is a major concern for women. The number of U.S. women diagnosed with lung disease is on the rise. More women are also dying from lung disease.
                    </Typography>
                    </ExpansionPanelDetails>
                </ExpansionPanel>
                <ExpansionPanel>
                    <ExpansionPanelSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel2a-content"
                        id="panel2a-header"
                    >
                        <Typography className={classes.heading}>How can I find out if I have asthma?</Typography>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails>
                        <Typography className={classes.heading}>
                            Asthma can be hard to diagnose. The signs of asthma can seem like the signs of COPD, pneumonia, bronchitis, pulmonary embolism, anxiety, and heart disease.

                            Common symptoms of asthma are:

                        {<ul><li><b>Coughing</b> </li>
                                <li> <b>Wheezing</b> </li>
                                <li> <b>Chest tightness.</b> </li>
                                <li><b>Shortness of breath</b> </li>
                            </ul>}

                        To diagnose asthma, the doctor asks about your symptoms and what seems to trigger them, reviews your health history, and does a physical exam.

                        To confirm the diagnosis, the doctor may do other tests, such as:
                        {<ul>
                                <li>
                                    <b>Spirometry (speye-ROM-eh-tree).</b> The doctor uses a medical machine called a spirometer. This test measures how much air you can breathe in and out. It also measures how fast you can blow air out. The doctor may also give you medicines and then retest you to see if your results improve.</li>
                                <li>
                                    <b>Bronchoprovocation (bron-KOH-prah-vuh-KAY-shun)</b> Your lung function is tested using spirometry while more stress is put on the lungs. This may be during physical activity or after you breathe in increasing doses of a special chemical or cold air.</li>
                                <li>
                                    <b>Chest x-ray or EKG (electrocardiogram). </b> These tests can sometimes find out if another disease or a foreign object may be causing your symptoms.</li>
                                <li>
                                    <b>AM (lymphangioleiomyomatosis) (lim-FAN-jee-oh-LEE-oh-MEYE-oh-mah-TOH-sis).</b> This is a rare lung disease that mostly affects women in their mid-30s and 40s. Muscle-like cells grow out of control in certain organs, including the lungs.</li>
                                <li>
                                    <b>Other tests. </b> The doctor may want to test for other problems that might be causing the symptoms. These include stomach acid backing up into the throat, vocal cord problems, or sleep apnea. </li></ul>}
                        </Typography>
                    </ExpansionPanelDetails>
                </ExpansionPanel>


                <ExpansionPanel>
                    <ExpansionPanelSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel2a-content"
                        id="panel2a-header"
                    >
                        <Typography className={classes.heading}>What is Biopsy?</Typography>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails>
                        <Typography className={classes.heading}>
                            A biopsy is a medical test commonly performed by a surgeon, interventional radiologist, or an interventional cardiologist. The process involves extraction of sample cells or tissues for examination to determine the presence or extent of a disease.
                        <Box alignItems="center" style={{ color: "white", paddingRight: "20rem", left: "auto", right: "auto" }} display="flex" >
                                <Box>
                                    <LightTooltip title="Biopsy Sampling Preocess" TransitionComponent={Zoom} placement="bottom-end">
                                        <img alt="Biopsy Sampling" src={require('../static/images/FAQ/sample_biopsy.jpg')} />
                                    </LightTooltip>
                                </Box>
                                <Box >
                                    <LightTooltip title="Lung Biopsy Image" TransitionComponent={Zoom} placement="bottom-end">
                                        <img style={{ height: "250px" }} alt="Lung Biopsy" src={require('../static/images/FAQ/lung_biopsy.jpg')} />
                                    </LightTooltip>
                                </Box>
                            </Box>

                        </Typography>
                    </ExpansionPanelDetails>
                </ExpansionPanel>

                <ExpansionPanel>
                    <ExpansionPanelSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel2a-content"
                        id="panel2a-header"
                    >
                        <Typography className={classes.heading}>What are symptoms of COPD?</Typography>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails>
                        <Typography className={classes.heading}>
                            COPD symptoms can vary widely from patient to patient. The most common symptoms are chronic cough, saliva/mucus production, shortness of breath (especially with exertion) and fatigue. Symptoms often progress slowly over time, or may come and go in people with milder stages of COPD. Symptoms can also suddenly worsen (called acute exacerbation).
          </Typography>
                    </ExpansionPanelDetails>
                </ExpansionPanel>

                <ExpansionPanel>
                    <ExpansionPanelSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel2a-content"
                        id="panel2a-header"
                    >
                        <Typography className={classes.heading}>What are the best COPD treatment options?</Typography>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails>
                        <Typography className={classes.heading}>
                            There are two goals when treating COPD: improve the symptoms of the disease and prevent a sudden worsening of the disease (called acute exacerbation). Quitting smoking is the best way to prevent COPD from getting worse. Other treatments may include:




                        {<ul><li>Bronchodilator inhalers in both short- and long-acting forms.</li>
                                <li> Inhaled corticosteroids, which may be given in combination with a long-acting bronchodilator inhaler for people with persistent symptoms.</li>
                                <li> Oxygen therapy for select patients with low levels of oxygen in the blood (severe hypoxemia).</li>
                                <li>

                                    Oral medications (azithromycin, roflumilast) for people with sudden worsening of symptoms despite conventional therapy.</li>
                            </ul>}


                        </Typography>
                    </ExpansionPanelDetails>
                </ExpansionPanel>

                <ExpansionPanel>
                    <ExpansionPanelSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel2a-content"
                        id="panel2a-header"
                    >
                        <Typography className={classes.heading}>What is Lung Volume Reduction Surgery?</Typography>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails>
                        <Typography className={classes.heading}>
                            Lung volume reduction surgery is a surgical procedure that removes diseased lung tissue from patients with advanced COPD. This surgery may improve symptoms and survival in carefully selected patients who have low exercise capacity and emphysema that is predominantly in the upper lobe of the lung. A minimally invasive, non-surgical approach called bronchoscopic lung volume reduction is currently being tested in clinical trials, but is not yet approved for routine use.
          </Typography>
                    </ExpansionPanelDetails>
                </ExpansionPanel>
                <ExpansionPanel>
                    <ExpansionPanelSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel2a-content"
                        id="panel2a-header"
                    >
                        <Typography className={classes.heading}>What is Chest X-Ray?</Typography>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails>
                        <Typography className={classes.heading}>
                            A chest radiograph, called a chest X-ray, or chest film, is a projection radiograph of the chest used to diagnose conditions affecting the chest, its contents, and nearby structures. Chest radiographs are the most common film taken in medicine
                         <Box alignItems="center" style={{ marginLeft: "30%", marginTop: "2%", color: "white", paddingRight: "20rem" }} display="flex" >
                                <Box>
                                    <LightTooltip title="Chest XRAY (Radiography)" TransitionComponent={Zoom} placement="bottom-end">
                                        <img style={{ height: "250px" }} alt="Chest XRAY (Radiography)" src={require('../static/images/FAQ/chest_XRAY.jpg')} />
                                    </LightTooltip>
                                </Box>
                                <Box>
                                    <LightTooltip title="Chest XRAY (Radiography)" TransitionComponent={Zoom} placement="bottom-end">
                                        <img style={{ height: "250px" }} alt="Chest XRAY (Radiography)" src={require('../static/images/FAQ/chest_XRAY2.jpg')} />
                                    </LightTooltip>
                                </Box>
                            </Box>
                        </Typography>

                    </ExpansionPanelDetails>
                </ExpansionPanel>

            </div >
        );
}