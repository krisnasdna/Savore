<template>
  <div class="grid grid-cols-3 grid-flow-row-dense gap-10 w-full">
    <div class="flex flex-col gap-10 col-span-2">
      <div>
        <div class="grid grid-cols-3 justify-start gap-6">
          <div class="bg-[#4A52E6] py-6 ps-6 pe-8 rounded-xl border-2 border-black shadow-[0px_4px_0px_-1px_#000000]">
            <div class="flex felx-row items-center gap-6">
              <div class="size-10 rounded-full ring-1 ring-black bg-[#F3F3F3] flex items-center justify-center">
                  <Icon name="clarity:piggy-bank-solid" class="text-2xl text-[#4A52E6]"/>
              </div>
              <div class="flex flex-col gap-2">
                  <h5 class="text-white">Income</h5>
                  <h1 class="text-white font-bold text-2xl">$5240.21 <span class="text-[#4DE980] text-base">+4.2%</span></h1>
              </div>
            </div>
          </div>
          <div class="bg-[#FFF] py-6 ps-6 pe-8 rounded-xl border-2 border-black shadow-[0px_4px_0px_-1px_#000000]">
            <div class="flex felx-row items-center gap-4">
              <div class="size-10 rounded-full ring-1 ring-black bg-[#F3F3F3] flex items-center justify-center">
                  <Icon name="clarity:piggy-bank-solid" class="text-2xl text-black"/>
              </div>
              <div class="flex flex-col gap-2">
                  <h5 class="text-black">Income</h5>
                  <h1 class="text-black font-bold text-2xl">$5240.21</h1>
              </div>
            </div>
          </div>
          <div class="bg-[#FFF] py-6 ps-6 pe-8 rounded-xl border-2 border-black shadow-[0px_4px_0px_-1px_#000000]">
            <div class="flex felx-row items-center gap-4">
              <div class="size-10 rounded-full ring-1 ring-black bg-[#F3F3F3] flex items-center justify-center">
                  <Icon name="clarity:piggy-bank-solid" class="text-2xl text-black"/>
              </div>
              <div class="flex flex-col gap-2">
                  <h5 class="text-black">Income</h5>
                  <h1 class="text-black font-bold text-2xl">$5240.21</h1>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="min-h-[300px] h-[40vh] border-2 border-black rounded-xl shadow-[0px_4px_0px_-1px_#000000] p-4">
        <ClientOnly>
          <VChart class="w-full h-full p-0 m-0" :option="chartOptions" autoresize />
        </ClientOnly>
      </div>
    </div>
    <div>
        <div class="border-2 border-black rounded-xl shadow-[0px_4px_0px_-1px_#000000] h-full p-3">
          <div class="flex flex-row items-center justify-between">
            <h1 class="font-semibold text-xl">Budget </h1>
            <h2 class=""> View All </h2>
          </div>
          <div>

          </div>
        </div>
    </div>
  </div>

</template>

<script  setup>
definePageMeta({
  middleware: ['auth'],
  layout: 'dashboard',
  title: 'Dashboard'
});

const chartOptions = ref({

  tooltip: {},
  xAxis: {
    type: 'category',
    data: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun']
  },
  grid: {
    left: '2%',
    right: '2%',
    bottom: '2%',
    containLabel: true
  },
  yAxis: {
    type: 'value'
  },
  series: [
    {
      name: 'Income',
      type: 'bar',
      data: [5200, 4300, 4800, 3900, 6000, 5700],
      itemStyle: {
        color: '#4A52E6'
      },
      barWidth: '40%',
    }
  ]
});

</script>

<style>

</style>