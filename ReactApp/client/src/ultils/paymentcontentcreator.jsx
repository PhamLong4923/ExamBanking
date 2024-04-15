
const ContentGenerator = ({ type, value, action }) => {

    return ('EBS' + type + action + value);

}

export default ContentGenerator;
//type TM
//action U/C
//EBSBMU01
//EBSTKCSB, EBSTKCPB, EBSTKU{id}A{n}