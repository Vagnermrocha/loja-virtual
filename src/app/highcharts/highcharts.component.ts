import { Component, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';
import { CartService } from '../shared/service/cart.service';

@Component({
  selector: 'app-highcharts',
  templateUrl: './highcharts.component.html',
  styleUrls: ['./highcharts.component.scss'],
})
export class HighchartsComponent implements OnInit {
  Highcharts: typeof Highcharts = Highcharts;

  chartOptions1: Highcharts.Options = {
    chart: {
      type: 'column',
    },
    title: {
      text: 'Vendas por Categoria',
    },
    xAxis: {
      categories: [] as string[],
    },
    yAxis: {
      title: {
        text: 'Total de Vendas',
      },
      labels: {
        formatter: function () {
          return Number(this.value).toFixed(2);
        },
      },
    },
    series: [
      {
        name: 'Categorias',
        data: [] as number[],
        type: 'column',
      },
    ],
  };

  chartOptions2: Highcharts.Options = {
    chart: {
      type: 'pie',
    },
    title: {
      text: 'Vendas por Produto',
    },
    series: [
      {
        name: 'Produtos',
        data: [] as Highcharts.SeriesPieOptions['data'],
        type: 'pie',
      },
    ],
  };

  productDetails: { [key: string]: number } = {};

  constructor(private cartService: CartService) {}

  ngOnInit() {
    this.cartService.getPurchases().subscribe((categoryTotals) => {
      this.chartOptions1.xAxis = {
        categories: Object.keys(categoryTotals),
      };
      this.chartOptions1.series = [
        {
          name: 'Categorias',
          data: Object.values(categoryTotals),
          type: 'column',
        },
      ];
      Highcharts.chart('chart1', this.chartOptions1);
    });

    this.cartService.getPurchases().subscribe((produtoTotals) => {
      const data = Object.entries(produtoTotals).map(([id, total]) => ({
        name: `ID: ${id}`,
        y: total,
      }));

      this.productDetails = produtoTotals;

      this.chartOptions2.series = [
        {
          name: 'Produtos',
          data: data,
          type: 'pie',
        },
      ];

      Highcharts.chart('chart2', this.chartOptions2);
    });
  }
}
