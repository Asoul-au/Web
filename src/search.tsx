import * as React from "react";
import "./header.css";
import { CustomTopBar } from "./header";
import { Checkbox, Text } from "@fluentui/react";
import { TextField } from "@fluentui/react/lib/TextField";
import { IStackTokens, Stack } from "@fluentui/react/lib/Stack";
import { Persona, PersonaSize } from "@fluentui/react/lib/Persona";
import "./search.css";
import { PrimaryButton } from "@fluentui/react/lib/Button";
import { ProgressIndicator } from "@fluentui/react/lib/ProgressIndicator";
import * as moment from "moment";
// @ts-ignore
import Base64  from 'base-64';
// import {Simulate} from "react-dom/test-utils";
// import error = Simulate.error;

let apiServer:string="http://127.0.0.1"
// let apiServer:string="https://api.asoul-au.live"
const controller = new AbortController()
const timeoutId = setTimeout(() => controller.abort(), 60000)
const leftSearchStack: IStackTokens = {
    childrenGap: "l1",
    padding: "l2",
};
const rightResultStack: IStackTokens = leftSearchStack;

interface CommentProps{
    id?:number;
    avid:number;
    name:string;
    userid?:number;
    ctime:number;
    like:number;
    fanType:string;
    fanLevel:number;
    content:string;
    contentType?:number;
}

interface CommentStates{
    loaded?:boolean;
}

class CommentCard extends React.Component<CommentProps,CommentStates> {
    constructor(props:CommentProps) {
        super(props);
        this.state={
            loaded:false,
        };
    }
    render() {
        return (
            <span className="commentCard">
                <Stack
                    horizontalAlign="start"
                    verticalAlign="start"
                    verticalFill
                >
                    <Persona
                        className="persona"
                        text={this.props.name}
                        secondaryText={this.props.fanType+" | "+this.props.fanLevel.toString()}
                        size={PersonaSize.size48}
                    />
                    <Text className="commentText" variant="mediumPlus">{this.props.content}
                    </Text>
                    <Text className="commentText" variant="smallPlus">
                        {"> 于"+moment.unix(this.props.ctime).format('YYYY-MM-DD')+"在视频"}
                        <a href={"https://www.bilibili.com/video/av"+this.props.avid.toString()} target="_blank" rel="noopener noreferrer">
                            {"av"+this.props.avid.toString()}</a>
                        {"中发表，获赞数："+this.props.like.toString()}
                    </Text>
                </Stack>
            </span>
        );
    }
}

interface SearchProps{

}

interface SearchState{
    comment?:string;
    result?:Array<CommentProps>;
}

export class Search extends React.Component<SearchProps,SearchState> {
    constructor(props:SearchProps) {
        super(props);
        this.state={
            comment:"",
            result:[],
        }
    }
    search(event:React.MouseEvent<HTMLElement>){
        const {comment}=this.state;
        console.log("Search button clicked/=>"+ apiServer+ "/search?comment="+comment+"&full=true")
        fetch(apiServer+ "/comment/233",{
            method:"GET",
            mode:"no-cors",
            headers:{
                'Content-Type':'application/x-www-form-urlencoded',
                'charset':'UTF-8',
                "Access-Control-Allow-Origin":"*"
            },
        }).then((response)=>{
            console.log(response)
            // console.log(JSON.stringify(response))
            return JSON.parse(JSON.stringify(response))
            // .then((response)=>{
            //     console.log(response)
            // }).catch((error)=>{
            //     console.log(error)
            // })
        })
        .then((json)=>{
            console.log(json)
        })
    }
    updateComment(event:React.FormEvent<HTMLElement>,value:string|undefined){
        if(value!==undefined){
            this.setState({
                comment:value,
            })
        }
    }
    render() {
        return (
            <span>
                <CustomTopBar />
                <span className="leftSearch">
                    <Stack
                        className="searchArea"
                        horizontalAlign="start"
                        verticalAlign="start"
                        verticalFill
                        tokens={leftSearchStack}
                    >
                        <TextField
                            className="searchBox"
                            label="搜索"
                            multiline
                            resizable={false}
                            rows={15}
                            placeholder={"在这里输入查询内容"}
                            // value={comment}
                            onChange={this.updateComment.bind(this)}
                        />
                        <Checkbox
                            className="searchCheckBox"
                            label="筛选粉丝牌"
                        />
                        <Checkbox
                            className="searchCheckBox"
                            label="筛选长评论（>20）"
                        />
                        <Checkbox className="searchCheckBox" label="npk48" />
                        <Checkbox
                            className="searchCheckBox"
                            label="gnk48（试运行）"
                        />
                        <PrimaryButton text="搜索" onClick={this.search.bind(this)}/>
                    </Stack>
                </span>
                <span className="rightResult">
                    <Stack
                        className="resultArea"
                        horizontalAlign="center"
                        verticalAlign="start"
                        verticalFill
                        tokens={rightResultStack}
                    >
                        <CommentCard id={103518749808} avid={936756265} name={"tab6y今天吃什么"} ctime={1645697389} like={10} fanType={"嘉心糖"} fanLevel={12} content={"外甥在我房间玩的时候打开了我桌面上的小摆件，他得意又新奇地大声跟我炫耀:“你看！这里面有个小人！”\n那个摆件是好几年前看asoul的时候中的，我才知道它原来是可以打开的。收到那会儿其实我已经不怎么看直播了，小团体也都退了，也没关注过别人的返图。那小布偶是个q版的嘉然，还抱着一个小布包做的嘉心糖，蛮可爱的。我从他手里拿过玩偶，仔细看，突然想起来好像说这个还是真正的嘉然手缝的来着。\n刚好朋友在微信上问我有没有空上号，我随口问起asoul，我说好久没关注过了，天天996实在没空看直播，她们现在怎么样了?火了没有？百万粉了没有？\n朋友说她们两年前就毕业了啊。\n我说哦。\n抱着侄子下楼去吃饭，一筷子差点捅进鼻子里，被我妈骂多大人了吃饭还走神，我才突然有一种被别人打了一棍子的感觉。\n她们是没有前世，播了好几年都没有撕皮和被挖的虚拟偶像。\n她们的毕业，讲得直白点就是，作为虚拟偶像，死了。\n恍惚之中我想起来，两年前她们毕业的公告我其实看到了。那会儿考研二战失败，对象已经在实验室里忙的每天没空理我，父母在家里都不敢跟我大声说话，我差不多有半个月没跟人交流过，每天关在卧室里翻着招聘信息，每天晚上都是毫无困意的在床上躺好几个小时然后直接昏迷。\n然后那天，在一页一页的招聘信息里，手机里弹出了她们的毕业公告。\n那天晚上我难得的记住了自己是怎么一点点入睡的，睡着以后我做了一个梦，梦的结局是已经快十一点了她们还没下播。我打sc问怎么b站公务员还不下播，把明天的一起播了明天不播了是吧?\n那是我唯一一次被念sc。\n嘉然说对不起，但是明天真的没有了。\n但其实我根本没赶上她们的毕业直播。\n而且永远没有机会了。"}/>
                    <CommentCard id={103518749808} avid={936756265} name={"tab6y今天吃什么"} ctime={1645697389} like={10} fanType={"嘉心糖"} fanLevel={12} content={"外甥在我房间玩的时候打开了我桌面上的小摆件，他得意又新奇地大声跟我炫耀:“你看！这里面有个小人！”\n那个摆件是好几年前看asoul的时候中的，我才知道它原来是可以打开的。收到那会儿其实我已经不怎么看直播了，小团体也都退了，也没关注过别人的返图。那小布偶是个q版的嘉然，还抱着一个小布包做的嘉心糖，蛮可爱的。我从他手里拿过玩偶，仔细看，突然想起来好像说这个还是真正的嘉然手缝的来着。\n刚好朋友在微信上问我有没有空上号，我随口问起asoul，我说好久没关注过了，天天996实在没空看直播，她们现在怎么样了?火了没有？百万粉了没有？\n朋友说她们两年前就毕业了啊。\n我说哦。\n抱着侄子下楼去吃饭，一筷子差点捅进鼻子里，被我妈骂多大人了吃饭还走神，我才突然有一种被别人打了一棍子的感觉。\n她们是没有前世，播了好几年都没有撕皮和被挖的虚拟偶像。\n她们的毕业，讲得直白点就是，作为虚拟偶像，死了。\n恍惚之中我想起来，两年前她们毕业的公告我其实看到了。那会儿考研二战失败，对象已经在实验室里忙的每天没空理我，父母在家里都不敢跟我大声说话，我差不多有半个月没跟人交流过，每天关在卧室里翻着招聘信息，每天晚上都是毫无困意的在床上躺好几个小时然后直接昏迷。\n然后那天，在一页一页的招聘信息里，手机里弹出了她们的毕业公告。\n那天晚上我难得的记住了自己是怎么一点点入睡的，睡着以后我做了一个梦，梦的结局是已经快十一点了她们还没下播。我打sc问怎么b站公务员还不下播，把明天的一起播了明天不播了是吧?\n那是我唯一一次被念sc。\n嘉然说对不起，但是明天真的没有了。\n但其实我根本没赶上她们的毕业直播。\n而且永远没有机会了。"}/>
                    <CommentCard id={103518749808} avid={936756265} name={"tab6y今天吃什么"} ctime={1645697389} like={10} fanType={"嘉心糖"} fanLevel={12} content={"外甥在我房间玩的时候打开了我桌面上的小摆件，他得意又新奇地大声跟我炫耀:“你看！这里面有个小人！”\n那个摆件是好几年前看asoul的时候中的，我才知道它原来是可以打开的。收到那会儿其实我已经不怎么看直播了，小团体也都退了，也没关注过别人的返图。那小布偶是个q版的嘉然，还抱着一个小布包做的嘉心糖，蛮可爱的。我从他手里拿过玩偶，仔细看，突然想起来好像说这个还是真正的嘉然手缝的来着。\n刚好朋友在微信上问我有没有空上号，我随口问起asoul，我说好久没关注过了，天天996实在没空看直播，她们现在怎么样了?火了没有？百万粉了没有？\n朋友说她们两年前就毕业了啊。\n我说哦。\n抱着侄子下楼去吃饭，一筷子差点捅进鼻子里，被我妈骂多大人了吃饭还走神，我才突然有一种被别人打了一棍子的感觉。\n她们是没有前世，播了好几年都没有撕皮和被挖的虚拟偶像。\n她们的毕业，讲得直白点就是，作为虚拟偶像，死了。\n恍惚之中我想起来，两年前她们毕业的公告我其实看到了。那会儿考研二战失败，对象已经在实验室里忙的每天没空理我，父母在家里都不敢跟我大声说话，我差不多有半个月没跟人交流过，每天关在卧室里翻着招聘信息，每天晚上都是毫无困意的在床上躺好几个小时然后直接昏迷。\n然后那天，在一页一页的招聘信息里，手机里弹出了她们的毕业公告。\n那天晚上我难得的记住了自己是怎么一点点入睡的，睡着以后我做了一个梦，梦的结局是已经快十一点了她们还没下播。我打sc问怎么b站公务员还不下播，把明天的一起播了明天不播了是吧?\n那是我唯一一次被念sc。\n嘉然说对不起，但是明天真的没有了。\n但其实我根本没赶上她们的毕业直播。\n而且永远没有机会了。"}/>
                    <CommentCard id={103518749808} avid={936756265} name={"tab6y今天吃什么"} ctime={1645697389} like={10} fanType={"嘉心糖"} fanLevel={12} content={"外甥在我房间玩的时候打开了我桌面上的小摆件，他得意又新奇地大声跟我炫耀:“你看！这里面有个小人！”\n那个摆件是好几年前看asoul的时候中的，我才知道它原来是可以打开的。收到那会儿其实我已经不怎么看直播了，小团体也都退了，也没关注过别人的返图。那小布偶是个q版的嘉然，还抱着一个小布包做的嘉心糖，蛮可爱的。我从他手里拿过玩偶，仔细看，突然想起来好像说这个还是真正的嘉然手缝的来着。\n刚好朋友在微信上问我有没有空上号，我随口问起asoul，我说好久没关注过了，天天996实在没空看直播，她们现在怎么样了?火了没有？百万粉了没有？\n朋友说她们两年前就毕业了啊。\n我说哦。\n抱着侄子下楼去吃饭，一筷子差点捅进鼻子里，被我妈骂多大人了吃饭还走神，我才突然有一种被别人打了一棍子的感觉。\n她们是没有前世，播了好几年都没有撕皮和被挖的虚拟偶像。\n她们的毕业，讲得直白点就是，作为虚拟偶像，死了。\n恍惚之中我想起来，两年前她们毕业的公告我其实看到了。那会儿考研二战失败，对象已经在实验室里忙的每天没空理我，父母在家里都不敢跟我大声说话，我差不多有半个月没跟人交流过，每天关在卧室里翻着招聘信息，每天晚上都是毫无困意的在床上躺好几个小时然后直接昏迷。\n然后那天，在一页一页的招聘信息里，手机里弹出了她们的毕业公告。\n那天晚上我难得的记住了自己是怎么一点点入睡的，睡着以后我做了一个梦，梦的结局是已经快十一点了她们还没下播。我打sc问怎么b站公务员还不下播，把明天的一起播了明天不播了是吧?\n那是我唯一一次被念sc。\n嘉然说对不起，但是明天真的没有了。\n但其实我根本没赶上她们的毕业直播。\n而且永远没有机会了。"}/>
                    <CommentCard id={103518749808} avid={936756265} name={"tab6y今天吃什么"} ctime={1645697389} like={10} fanType={"嘉心糖"} fanLevel={12} content={"外甥在我房间玩的时候打开了我桌面上的小摆件，他得意又新奇地大声跟我炫耀:“你看！这里面有个小人！”\n那个摆件是好几年前看asoul的时候中的，我才知道它原来是可以打开的。收到那会儿其实我已经不怎么看直播了，小团体也都退了，也没关注过别人的返图。那小布偶是个q版的嘉然，还抱着一个小布包做的嘉心糖，蛮可爱的。我从他手里拿过玩偶，仔细看，突然想起来好像说这个还是真正的嘉然手缝的来着。\n刚好朋友在微信上问我有没有空上号，我随口问起asoul，我说好久没关注过了，天天996实在没空看直播，她们现在怎么样了?火了没有？百万粉了没有？\n朋友说她们两年前就毕业了啊。\n我说哦。\n抱着侄子下楼去吃饭，一筷子差点捅进鼻子里，被我妈骂多大人了吃饭还走神，我才突然有一种被别人打了一棍子的感觉。\n她们是没有前世，播了好几年都没有撕皮和被挖的虚拟偶像。\n她们的毕业，讲得直白点就是，作为虚拟偶像，死了。\n恍惚之中我想起来，两年前她们毕业的公告我其实看到了。那会儿考研二战失败，对象已经在实验室里忙的每天没空理我，父母在家里都不敢跟我大声说话，我差不多有半个月没跟人交流过，每天关在卧室里翻着招聘信息，每天晚上都是毫无困意的在床上躺好几个小时然后直接昏迷。\n然后那天，在一页一页的招聘信息里，手机里弹出了她们的毕业公告。\n那天晚上我难得的记住了自己是怎么一点点入睡的，睡着以后我做了一个梦，梦的结局是已经快十一点了她们还没下播。我打sc问怎么b站公务员还不下播，把明天的一起播了明天不播了是吧?\n那是我唯一一次被念sc。\n嘉然说对不起，但是明天真的没有了。\n但其实我根本没赶上她们的毕业直播。\n而且永远没有机会了。"}/>
                    <CommentCard id={103518749808} avid={936756265} name={"tab6y今天吃什么"} ctime={1645697389} like={10} fanType={"嘉心糖"} fanLevel={12} content={"外甥在我房间玩的时候打开了我桌面上的小摆件，他得意又新奇地大声跟我炫耀:“你看！这里面有个小人！”\n那个摆件是好几年前看asoul的时候中的，我才知道它原来是可以打开的。收到那会儿其实我已经不怎么看直播了，小团体也都退了，也没关注过别人的返图。那小布偶是个q版的嘉然，还抱着一个小布包做的嘉心糖，蛮可爱的。我从他手里拿过玩偶，仔细看，突然想起来好像说这个还是真正的嘉然手缝的来着。\n刚好朋友在微信上问我有没有空上号，我随口问起asoul，我说好久没关注过了，天天996实在没空看直播，她们现在怎么样了?火了没有？百万粉了没有？\n朋友说她们两年前就毕业了啊。\n我说哦。\n抱着侄子下楼去吃饭，一筷子差点捅进鼻子里，被我妈骂多大人了吃饭还走神，我才突然有一种被别人打了一棍子的感觉。\n她们是没有前世，播了好几年都没有撕皮和被挖的虚拟偶像。\n她们的毕业，讲得直白点就是，作为虚拟偶像，死了。\n恍惚之中我想起来，两年前她们毕业的公告我其实看到了。那会儿考研二战失败，对象已经在实验室里忙的每天没空理我，父母在家里都不敢跟我大声说话，我差不多有半个月没跟人交流过，每天关在卧室里翻着招聘信息，每天晚上都是毫无困意的在床上躺好几个小时然后直接昏迷。\n然后那天，在一页一页的招聘信息里，手机里弹出了她们的毕业公告。\n那天晚上我难得的记住了自己是怎么一点点入睡的，睡着以后我做了一个梦，梦的结局是已经快十一点了她们还没下播。我打sc问怎么b站公务员还不下播，把明天的一起播了明天不播了是吧?\n那是我唯一一次被念sc。\n嘉然说对不起，但是明天真的没有了。\n但其实我根本没赶上她们的毕业直播。\n而且永远没有机会了。"}/>
                    <CommentCard id={103518749808} avid={936756265} name={"tab6y今天吃什么"} ctime={1645697389} like={10} fanType={"嘉心糖"} fanLevel={12} content={"外甥在我房间玩的时候打开了我桌面上的小摆件，他得意又新奇地大声跟我炫耀:“你看！这里面有个小人！”\n那个摆件是好几年前看asoul的时候中的，我才知道它原来是可以打开的。收到那会儿其实我已经不怎么看直播了，小团体也都退了，也没关注过别人的返图。那小布偶是个q版的嘉然，还抱着一个小布包做的嘉心糖，蛮可爱的。我从他手里拿过玩偶，仔细看，突然想起来好像说这个还是真正的嘉然手缝的来着。\n刚好朋友在微信上问我有没有空上号，我随口问起asoul，我说好久没关注过了，天天996实在没空看直播，她们现在怎么样了?火了没有？百万粉了没有？\n朋友说她们两年前就毕业了啊。\n我说哦。\n抱着侄子下楼去吃饭，一筷子差点捅进鼻子里，被我妈骂多大人了吃饭还走神，我才突然有一种被别人打了一棍子的感觉。\n她们是没有前世，播了好几年都没有撕皮和被挖的虚拟偶像。\n她们的毕业，讲得直白点就是，作为虚拟偶像，死了。\n恍惚之中我想起来，两年前她们毕业的公告我其实看到了。那会儿考研二战失败，对象已经在实验室里忙的每天没空理我，父母在家里都不敢跟我大声说话，我差不多有半个月没跟人交流过，每天关在卧室里翻着招聘信息，每天晚上都是毫无困意的在床上躺好几个小时然后直接昏迷。\n然后那天，在一页一页的招聘信息里，手机里弹出了她们的毕业公告。\n那天晚上我难得的记住了自己是怎么一点点入睡的，睡着以后我做了一个梦，梦的结局是已经快十一点了她们还没下播。我打sc问怎么b站公务员还不下播，把明天的一起播了明天不播了是吧?\n那是我唯一一次被念sc。\n嘉然说对不起，但是明天真的没有了。\n但其实我根本没赶上她们的毕业直播。\n而且永远没有机会了。"}/>
                    <CommentCard id={103518749808} avid={936756265} name={"tab6y今天吃什么"} ctime={1645697389} like={10} fanType={"嘉心糖"} fanLevel={12} content={"外甥在我房间玩的时候打开了我桌面上的小摆件，他得意又新奇地大声跟我炫耀:“你看！这里面有个小人！”\n那个摆件是好几年前看asoul的时候中的，我才知道它原来是可以打开的。收到那会儿其实我已经不怎么看直播了，小团体也都退了，也没关注过别人的返图。那小布偶是个q版的嘉然，还抱着一个小布包做的嘉心糖，蛮可爱的。我从他手里拿过玩偶，仔细看，突然想起来好像说这个还是真正的嘉然手缝的来着。\n刚好朋友在微信上问我有没有空上号，我随口问起asoul，我说好久没关注过了，天天996实在没空看直播，她们现在怎么样了?火了没有？百万粉了没有？\n朋友说她们两年前就毕业了啊。\n我说哦。\n抱着侄子下楼去吃饭，一筷子差点捅进鼻子里，被我妈骂多大人了吃饭还走神，我才突然有一种被别人打了一棍子的感觉。\n她们是没有前世，播了好几年都没有撕皮和被挖的虚拟偶像。\n她们的毕业，讲得直白点就是，作为虚拟偶像，死了。\n恍惚之中我想起来，两年前她们毕业的公告我其实看到了。那会儿考研二战失败，对象已经在实验室里忙的每天没空理我，父母在家里都不敢跟我大声说话，我差不多有半个月没跟人交流过，每天关在卧室里翻着招聘信息，每天晚上都是毫无困意的在床上躺好几个小时然后直接昏迷。\n然后那天，在一页一页的招聘信息里，手机里弹出了她们的毕业公告。\n那天晚上我难得的记住了自己是怎么一点点入睡的，睡着以后我做了一个梦，梦的结局是已经快十一点了她们还没下播。我打sc问怎么b站公务员还不下播，把明天的一起播了明天不播了是吧?\n那是我唯一一次被念sc。\n嘉然说对不起，但是明天真的没有了。\n但其实我根本没赶上她们的毕业直播。\n而且永远没有机会了。"}/>
                    </Stack>
                </span>
                <span className="wait">
                    <ProgressIndicator
                        className="resultWait"
                        label="Please wait..."
                        description="Fetching data..."
                    />
                </span>
            </span>
        );
    }
}
