Page({
  data: {
    image_url: "",
    taskId: null,
    imageUrl: '',
    status: '等待提交...',
    personImage: '',
    topGarmentImage: '',
    bottomGarmentImage: '', // 模特衣服照
  },

  onLoad: function () {
    wx.setNavigationBarTitle({
      title: 'ai试衣'
    });
  },

  choosePersonImage() {
    this.uploadImage('personImage');
  },

  chooseTopGarmentImage() {
    this.uploadImage('topGarmentImage');
  },

  chooseBottomGarmentImage() {
    this.uploadImage('bottomGarmentImage');
  },

  uploadImage(field) {
    const that = this;
    wx.showActionSheet({
      itemList: ['拍照上传', '从相册选择'],
      success(choice) {
        const sourceType = choice.tapIndex === 0 ? ['camera'] : ['album'];

        wx.chooseImage({
          count: 1,
          sizeType: ['original', 'compressed'],
          sourceType: sourceType,
          success(res) {
            const tempFilePath = res.tempFilePaths[0];
            const cloudPath = `${field}_images/${Date.now()}.jpg`;

            wx.cloud.uploadFile({
              cloudPath,
              filePath: tempFilePath,
              success(uploadRes) {
                wx.cloud.getTempFileURL({
                  fileList: [uploadRes.fileID],
                  success(urlRes) {
                    const fileURL = urlRes.fileList[0].tempFileURL;
                    const updateData = {};
                    updateData[field] = fileURL;
                    updateData.status = `${field} 上传成功`;
                    that.setData(updateData);
                  },
                  fail(e) {
                    console.error('获取临时地址失败', e);
                  }
                });
              },
              fail(err) {
                console.error('上传失败', err);
                that.setData({ status: `${field} 上传失败，请重试` });
              }
            });
          }
        });
      }
    });
  },

  // 下载保存生成图像
  saveImage() {
    const that = this;
    wx.downloadFile({
      url: that.data.imageUrl,
      success(res) {
        if (res.statusCode === 200) {
          wx.saveImageToPhotosAlbum({
            filePath: res.tempFilePath,
            success() {
              wx.showToast({
                title: '保存成功',
                icon: 'success'
              });
            },
            fail(err) {
              console.error('保存失败', err);
              wx.showModal({
                title: '保存失败',
                content: '请检查是否授权保存到相册',
                showCancel: false
              });
            }
          });
        } else {
          wx.showToast({ title: '下载失败', icon: 'none' });
        }
      },
      fail(err) {
        console.error('下载出错', err);
        wx.showToast({ title: '下载出错', icon: 'none' });
      }
    });
  },

  // 提交试衣任务
  submitTask() {
    const that = this;
    if (!that.data.personImage) {
      that.setData({ status: '请先上传模特图！' });
      return;
    }

    wx.request({
      url: 'https://dashscope.aliyuncs.com/api/v1/services/aigc/image2image/image-synthesis',
      method: 'POST',
      header: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer sk-c4d3ade2cefadfiagfuyygub596c5f8acaa12',
        'X-DashScope-Async': 'enable'
      },
      data: {
        model: 'aitryon',
        input: {
          person_image_url: that.data.personImage,
          top_garment_url: that.data.topGarmentImage,
          bottom_garment_url: that.data.bottomGarmentImage
        },
        parameters: {
          resolution: -1,
          restore_face: true
        }
      },
      success(res) {
        console.log('任务提交结果:', res);
        if (res.data.output?.task_id) {
          const taskId = res.data.output.task_id;
          that.setData({
            taskId,
            status: '任务已提交，开始绘画...'
          });
          that.pollTaskStatus(taskId);
        } else {
          that.setData({ status: '提交失败：未返回 task_id' });
        }
      },
      fail(err) {
        console.error('任务提交失败:', err);
        that.setData({ status: '网络错误或接口失败' });
      }
    });
  },

  // 轮询任务状态
  pollTaskStatus(taskId) {
    const that = this;
    wx.request({
      url: `https://dashscope.aliyuncs.com/api/v1/tasks/${taskId}`,
      method: 'GET',
      header: {
        'Authorization': 'Bearer sk-cfasidfhbah3ae2cbbd596sdddfc5f8afwefafrsfracaa12'
      },
      success(res) {
        console.log('轮询结果：', res);
        const output = res.data.output;
        if (!output) {
          that.setData({ status: '无任务输出信息' });
          return;
        }

        const status = output.task_status;
        console.log('当前状态:', status);

        if (status === 'SUCCEEDED') {
          let imageUrl = output.image_url || (output.results?.[0]?.image_url || '');
          if (imageUrl) {
            if (imageUrl.startsWith('http://')) {
              imageUrl = imageUrl.replace('http://', 'https://');
            }
            that.setData({
              status: '图像生成成功！',
              imageUrl
            });
          } else {
            that.setData({ status: '生成成功但未获取图像地址' });
          }

        } else if (status === 'FAILED' || status === 'UNKNOWN') {
          that.setData({ status: `任务失败，状态：${status}` });
        } else {
          that.setData({ status: `当前状态：${status}，继续绘画...` });
          setTimeout(() => that.pollTaskStatus(taskId), 5000);
        }
      },
      fail(err) {
        console.error('查询失败:', err);
        that.setData({ status: '查询失败，请稍后再试' });
      }
    });
  }
});
