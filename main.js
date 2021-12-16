// const colorRange = ['21a9ff', 'ff5e00', '4400ff', 'ff00aa', 'd80000', '8cd800'];
const colorRange = ['a', 'b', 'c', 'd', 'e', 'f'];
let existenceRange = '';
let availableColorRange = 0;


window.findfrom = data => {
    let result;
    window.reference.forEach(obj => {
        if(obj.title === data){
            result = obj;
        }
    })
    return result;
}

window.classes = [];


window.convert = data => {
    let result = [];
    window.reference = [];
    window.classes = {};

    data.forEach(obj => {
        let colorToAssign = null;
        if(existenceRange.includes(obj.subEntityId)){
            colorToAssign = colorRange[window.classes[obj.subEntityId]];
        } else {
            // New class
            existenceRange+=` ${obj.subEntityId}`;
            classes[obj.subEntityId] = availableColorRange;
            availableColorRange++;
            colorToAssign = colorRange[window.classes[obj.subEntityId]];
        }

        const x = {
            title: `${obj.name}`,
            start: obj.filingDueDate,
            allDay: false,
            backgroundColor: '#fff',
            classNames: [colorToAssign]
        }
        result.push(x);
        window.reference.push({...x, desc:obj.description});
    });
    return result;
}

const highlight = convert(data);

document.addEventListener('DOMContentLoaded', () => {
	var calendarEl = qs('.calendar');
	var calendar = new FullCalendar.Calendar(calendarEl, {
		initialView: 'dayGridMonth',
        themeSystem: 'bootstrap',
        height: '100%',
        stickyHeaderDates: true,
        events: highlight,
        dayMaxEventRows: 6,
        headerToolbar: {
            start: 'dayGridMonth,timeGridDay',
            center: 'title',
            end: 'today prevYear,prev,next,nextYear'
        },
        footerToolbar: {
            start: '',
            center: 'dayGridDay',
            end: ''
        },
        titleFormat: {
            year: 'numeric',
            month: 'long'
        },
        selectable: true,
        eventClick: i => {
            const content = i.el.lastElementChild.innerHTML;
            const obj = window.findfrom(content);
            qs('.overlay').style.transform = 'scaleY(1)'
            inner('.overlay .info', obj.desc)
            inner('.overlay .detail-title', obj.title)
        },
        eventMouseLeave: i => {
            setTimeout(() => {
                qs('.overlay').style.transform = 'scaleY(0)'
            }, 5090)
        }
	});
    
	calendar.render();
});
