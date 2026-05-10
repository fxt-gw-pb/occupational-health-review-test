// Sample data — chapter & knowledge-point fixtures for the design mockups.
// Real Markdown ingestion would replace this; structure mirrors the brief.

window.OH_DATA = {
  meta: {
    siteTitle: "职业卫生学 · 往年题考点复习",
    subtitle: "基于往年题考频整理的章节化复习系统",
    totalChapters: 16,
    totalPoints: 287,
    highFreqPoints: 64,
    pastQuestions: 412,
  },
  chapters: [
    { num: "一",   id: 1,  title: "绪论",                points: 12, hi: 2, peak: 4, color: "#2d5fd5", progress: 0.74 },
    { num: "二",   id: 2,  title: "职业生理与工效",      points: 18, hi: 4, peak: 5, color: "#2d5fd5", progress: 0.42 },
    { num: "三",   id: 3,  title: "不良气象条件",        points: 14, hi: 3, peak: 4, color: "#2d5fd5", progress: 0.58 },
    { num: "四",   id: 4,  title: "噪声与振动",          points: 22, hi: 6, peak: 6, color: "#2d5fd5", progress: 0.81, current: true },
    { num: "五",   id: 5,  title: "电离辐射",            points: 16, hi: 3, peak: 4, color: "#2d5fd5", progress: 0.30 },
    { num: "六",   id: 6,  title: "粉尘与尘肺病",        points: 26, hi: 9, peak: 6, color: "#2d5fd5", progress: 0.66 },
    { num: "七",   id: 7,  title: "高分子化合物",        points: 11, hi: 1, peak: 3, color: "#2d5fd5", progress: 0.18 },
    { num: "八",   id: 8,  title: "重金属中毒与职业心理学", points: 24, hi: 7, peak: 5, color: "#2d5fd5", progress: 0.52 },
    { num: "九",   id: 9,  title: "有机溶剂",            points: 20, hi: 5, peak: 5, color: "#2d5fd5", progress: 0.10 },
    { num: "十",   id: 10, title: "农药中毒",            points: 19, hi: 5, peak: 5, color: "#2d5fd5", progress: 0.0 },
    { num: "十一", id: 11, title: "妇女职业卫生",        points: 9,  hi: 2, peak: 3, color: "#2d5fd5", progress: 0.0 },
    { num: "十二", id: 12, title: "职业肿瘤",            points: 17, hi: 4, peak: 5, color: "#2d5fd5", progress: 0.0 },
    { num: "十三", id: 13, title: "职业流行病学",        points: 15, hi: 3, peak: 4, color: "#2d5fd5", progress: 0.0 },
    { num: "十四", id: 14, title: "职业卫生管理与实践",  points: 21, hi: 5, peak: 5, color: "#2d5fd5", progress: 0.0 },
    { num: "十五", id: 15, title: "职业卫生监测",        points: 13, hi: 2, peak: 3, color: "#2d5fd5", progress: 0.0 },
    { num: "十六", id: 16, title: "职业安全与职业伤害",  points: 14, hi: 3, peak: 4, color: "#2d5fd5", progress: 0.0 },
  ],

  // Knowledge points within "第四章 噪声与振动" — used as the hero chapter
  ch4Points: [
    {
      id: "p41", title: "噪声对听觉系统的损伤（暂时性听阈位移与永久性听阈位移）",
      section: "4.2.1", freq: 6, freqLabel: "6 次", related: 4, mastered: "review",
      basis: "近五年简答 / 论述高频出现，2021、2022、2023 均直接命题",
      excerpt: "暂时性听阈位移（TTS）系指人耳暴露于强噪声后听阈出现的暂时性升高，脱离噪声环境后可在数小时至数日内逐步恢复。永久性听阈位移（PTS）则为不可逆的听力损失，是噪声性耳聋的主要病理基础……"
    },
    {
      id: "p42", title: "等效连续 A 声级 LAeq,T 的物理含义与计算原则",
      section: "4.1.3", freq: 5, freqLabel: "5 次", related: 3, mastered: "in-progress",
      basis: "近五年单选+应用题持续考察，2024 应用题中要求列式计算",
      excerpt: "在规定的测量时间 T 内，A 计权声级的能量平均值称为等效连续 A 声级，记作 LAeq,T。其物理实质是：用同一时段内能量等效的稳态噪声所对应的 A 声级表征非稳态噪声对听觉系统的累积作用……"
    },
    {
      id: "p43", title: "手传振动综合作用与白指病（雷诺氏现象）",
      section: "4.4.2", freq: 5, freqLabel: "5 次", related: 5, mastered: "mastered",
      basis: "名词解释 + 简答多年覆盖；2020/2022/2023 均有出现",
      excerpt: "手传振动是指作业者通过手部接触振动工具或工件而传入人体的机械振动。长期暴露可引起以末梢循环、末梢神经及骨—关节—肌肉系统为主的全身性疾病，其特征性表现为发作性手指变白……"
    },
    {
      id: "p44", title: "噪声卫生标准 GBZ 2.2 接触限值的判定",
      section: "4.5.1", freq: 4, freqLabel: "4 次", related: 2, mastered: "todo",
      basis: "应用题高频，常与等效声级计算合并考察",
      excerpt: "国家职业卫生标准 GBZ 2.2 规定，工作场所噪声 8 小时等效声级接触限值为 85 dB(A)；当实际接触时间不足 8 小时时，可按等能量原则换算为等效 8 小时接触水平进行判定……"
    },
    {
      id: "p45", title: "听觉适应、听觉疲劳与噪声性耳聋的鉴别",
      section: "4.2.2", freq: 4, freqLabel: "4 次", related: 3, mastered: "todo",
      basis: "名词解释高频，2019、2021、2024 均直接命题",
      excerpt: "听觉适应：短时暴露下听阈轻度升高，离开噪声后数分钟内即恢复；听觉疲劳：暴露时间较长后听阈明显升高，恢复时间需数小时；噪声性耳聋：长期暴露累积所致不可逆性感音神经性聋……"
    },
    {
      id: "p46", title: "局部振动与全身振动的卫生学差别",
      section: "4.4.1", freq: 4, freqLabel: "4 次", related: 4, mastered: "review",
      basis: "简答题高频，与手传振动联合考察",
      excerpt: "局部振动主要由手持工具传入，作用于上肢，靶器官为末梢循环、神经及骨关节系统；全身振动经座椅或站立面经躯干传导，靶器官为脊柱、消化系统及前庭器官，其频率响应曲线亦不同……"
    },
    {
      id: "p47", title: "噪声的生理与心理非特异性影响",
      section: "4.2.3", freq: 3, freqLabel: "3 次", related: 2, mastered: "todo",
      basis: "简答中频，常作为综合论述的支题",
      excerpt: "除特异性听觉损害外，长期噪声暴露还可引起神经系统、心血管系统及内分泌系统的非特异性反应，如头晕、失眠、血压升高、注意力下降及作业绩效降低……"
    },
    {
      id: "p48", title: "脉冲噪声与稳态噪声的差别及评价方法",
      section: "4.1.4", freq: 3, freqLabel: "3 次", related: 2, mastered: "todo",
      basis: "近三年单选 + 简答覆盖",
      excerpt: "稳态噪声指声压级波动 < 3 dB 的连续噪声；脉冲噪声指声压级峰值远高于背景且持续时间极短（<1 s）的瞬态噪声，其评价应同时给出峰值声压级与脉冲间隔……"
    },
    {
      id: "p49", title: "防噪耳塞与防噪耳罩的选用原则",
      section: "4.5.3", freq: 2, freqLabel: "2 次", related: 1, mastered: "todo",
      basis: "应用题低频但稳定出现",
      excerpt: "应根据接触噪声的频谱特性、强度以及作业人员的工作时长综合选择，并通过简化计算法或频带分析法验证其降噪量是否满足岗位限值要求……"
    },
  ],

  // Past-year exercises (for hero chapter)
  ch4Exercises: [
    { id: "q1", year: "2024", source: "2024 期末 简答 第 3 题", type: "简答", title: "试述噪声对人体的特异性损害与非特异性损害，并举例说明。",  pointId: "p41" },
    { id: "q2", year: "2023", source: "2023 期末 应用 第 2 题", type: "应用", title: "某车间噪声 92 dB(A)，工人每日实际接触 6 h，试判断是否符合 GBZ 2.2 限值并说明理由。", pointId: "p44" },
    { id: "q3", year: "2022", source: "2022 期末 名解",          type: "名解", title: "等效连续 A 声级", pointId: "p42" },
    { id: "q4", year: "2022", source: "2022 期末 简答 第 5 题", type: "简答", title: "比较手传振动和全身振动的卫生学差别。", pointId: "p46" },
    { id: "q5", year: "2021", source: "2021 期末 论述 第 2 题", type: "论述", title: "结合白指病发生机制，论述局部振动作业的卫生学防护原则。", pointId: "p43" },
  ],
};
