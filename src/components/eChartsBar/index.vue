<template>

  <div class="eChartsBar">
    <div id="myChart" :style="{width: '100%', height: '25.875rem'}"></div>
  </div>

</template>

<script>
  let echarts = require('echarts/lib/echarts')
  // 引入柱状图组件
  require('echarts/lib/chart/bar')
  // 引入提示框和title组件
  require('echarts/lib/component/tooltip')
  require('echarts/lib/component/title')
  export default {
    name: 'eChartsBar',

    data() {
      return {
        Xdata: [ '1', '2', '3', '4', '5', '6', '7'],
        xName: '金额/元',
        yName:'近七天',

        setiesList: [
          {
//            name: '访问量',
            itemStyle: {
              normal: {
                barBorderRadius:[10, 10, 0, 0],
                color: '#F8B004',
                lineStyle: {
                  color: '#F8B004',
                  width: 2
                },
                areaStyle: {
                  color: '#f3f8ff'
                }
              }
            },
//            smooth: true,
            type: 'bar',
            barWidth: '35%',
            label: {
              normal: {
                show: true,
                position: 'top'
              }
            },
            data: [220, 182, 191, 234, 290, 330, 310],
            animationDuration: 600,
            animationEasing: 'cubicInOut'
          }]
      }
    },
    created() {

    },
    mounted() {
      this.drawLine()

    },
    methods: {
      drawLine() {
        //  console.log("画图开始")
        //  console.log(this.setiesList)
        // 基于准备好的dom，初始化echarts实例
        let myChart = echarts.init(document.getElementById('myChart'))
        // 绘制图表
        myChart.setOption({
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'shadow',
              label: {
                backgroundColor: '#6a7985'
              },

            }
          },

          toolbox: {
            feature: {
              saveAsImage: {}
            }
          },
          grid: {
            top:'18%',
            left: '5%',
            right: '15%',
            bottom: '5%',
            containLabel: true
          },
          xAxis: [
            {
              nameTextStyle:{
                padding: [30, 0, 0, 0]
              },
              nameGap:0,
              type: 'category',
              name: this.yName,
              data: this.Xdata,
              splitLine:{show: false},
              axisTick: {
                show: false,
                alignWithLabel: true,
                lineStyle:{color:'#CECECE'} //刻度线颜色
              },
              axisLabel:{color:'#646464'},   // x轴字体颜色
              axisLine:{//path://M5,20 L5,5 L8,8 L5,2 L2,8 L5,5 L5.3,6 L5.3,20
                lineStyle:{color:'#CECECE'},    // x轴坐标轴颜色
                symbol:['none','path://M5,20 L5,5 L8,8 L5,2 L2,8 L5,5 L5.3,6 L5.3,20'],
                symbolOffset:4,
                symbolSize:[20,23]
              }
            }
          ],
          yAxis: [
            {
              nameTextStyle:{
                padding: [0, 25, 0, 0]
              },
              axisTick: {
                show: false,
                alignWithLabel: true,
                lineStyle:{color:'#CECECE'}
              },
              name:this.xName,
              axisLabel:{color:'#646464'},   // x轴字体颜色
              splitLine:{show: false},
              type: 'value',
              axisLine:{
                lineStyle:{color:'#CECECE'},    // x轴坐标轴颜色
                symbol:['none','path://M5,20 L5,5 L8,8 L5,2 L2,8 L5,5 L5.3,6 L5.3,20'],
                symbolOffset:4,
                symbolSize:[20,23]
              }
            }
          ],
          series: this.setiesList
        });

        /*let myChart2 = echarts.init(document.getElementById('myChart2'))
        // 绘制图表
        myChart2.setOption({
          title: {text: '用户统计图', subtext: "访问量：2500，实名客户量：2500，升级客户量：2500"},
          legend: {
            data: ['访问量', '实名客户量','升级客户量']
          },
          tooltip: {
            trigger: 'axis',
            axisPointer : {            // 坐标轴指示器，坐标轴触发有效
              type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
            }
          },
          toolbox: {
            feature: {
              saveAsImage: {}
            }
          },
          grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
          },
          xAxis: [
            {
              type: 'category',
              name:'时间/日',
              axisTick: {
                alignWithLabel: true
              },
              data: ['1', '2', '3', '4', '5', '6', '7']
            }
          ],
          yAxis: [
            {
              type: 'value'
            }
          ],
          series: [
            {
              name:'访问量',
              type:'bar',
              smooth: true,
              color: ['#3398DB'],
              label: {
                normal: {
                  show: true,
                  position: 'top'
                }
              },
              barWidth: '10%',
              data:[10, 52, 200, 334, 390, 330, 220, 52, 200, 334, 390, 330, 220, 52, 200, 334, 390, 330, 220, 52, 200, 334, 390, 330, 220, 52, 200, 334, 390, 330, 220],
              animationDuration: 1800,
            },
            {
              name:'实名客户量',
              type:'bar',
              smooth: true,
              label: {
                normal: {
                  show: true,
                  position: 'top'
                }
              },
              barWidth: '10%',
              data:[10, 52, 200, 334, 390, 330, 220],
              animationDuration: 1800,
            }, {
              name:'升级客户量',
              type:'bar',
              smooth: true,
              label: {
                normal: {
                  show: true,
                  position: 'top'
                }
              },
              barWidth: '10%',
              data:[10, 52, 200, 334, 390, 330, 220],
              animationDuration: 1800,
            },
            /!*{
              name: '邮件营销', itemStyle: {
              normal: {
                color: '#FF005A',
                lineStyle: {
                  color: '#FF005A',
                  width: 2
                },
                areaStyle: {
                  color: '#f3f8ff'
                }
              }
            },
              smooth: true,
              type: 'line',
              label: {
                normal: {
                  show: true,
                  position: 'top'
                }
              },
              data: [120, 132, 101, 134, 90, 230, 210],
              animationDuration: 1800,
              animationEasing: 'cubicInOut'
            },
            {
              name: '联盟广告',
              smooth: true,
              type: 'line',
              label: {
                normal: {
                  show: true,
                  position: 'top'
                }
              },
              itemStyle: {
                normal: {
                  color: '#3888fa',
                  lineStyle: {
                    color: '#3888fa',
                    width: 2
                  },
                  areaStyle: {
                    color: '#f3f8ff'
                  }
                }
              },
              data: [220, 182, 191, 234, 290, 330, 310],
              animationDuration: 1800,
              animationEasing: 'quadraticOut'
            }*!/
          ]
        });*/
      }
    }
  }
</script>

<style rel="stylesheet/less" lang="less">


</style>
