import React from 'react'
import './../../style/style.css';

let listener = {};

const _Init = () => {
   let [list,setList] = React.useState([]);
   listener.set = (get) => list.length < 1 ? setList([...list,get]) : false
   listener.del = (key) => { list.forEach((item,i) => { if(item.key === key) list.splice(i, 1); }); setList(list); }
   return (<div className="notice" >{list.map(i => i.item)}</div>)
}

const _Send = (e) => {
    let key = new Date().getTime();
    e.key = key;
    listener.set({item: <NoticeItem key={key} data={e} />, key: key});
}

const NoticeItem = (props) => {

    const data = props.data;
    let [active,setActive] = React.useState('show');
    let [delite,setDelite] = React.useState(false);

    React.useEffect(() => {
        setTimeout(function () { setActive('hide'); }, 4800);
        setTimeout(function () { setDelite(true); listener.del(data.key);  }, 5500);
    },[data.key]);

    let a,b;
    switch(data.type){
        case 'error':    a = 'icon icon-io-close-circle-filled'; b = 'Ошибка:';          break;
        case 'success':  a = 'icon icon-io-checkmark-circle-filled'; b = 'Информация:';      break;
        case 'remark':   a = 'icon icon-io-information-circle-filled'; b = 'Подсказка:'; break;
        default:  a = 'icon fa fa-exclamation-circle'; b = 'Предупреждение:';   break;
    }
    return (<>{(!delite)
          ? <div className={'item '+data.type} status={active}>
               {data.text}
            </div>
          : <></>}</>);
}

let Notice = {
  'Send': _Send,
  'Init': _Init,
}

export default Notice;