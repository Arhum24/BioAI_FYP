from keras.models import load_model
from keras.models import Sequential
from keras.layers import Dense
from keras.applications.resnet50 import ResNet50
from keras.layers import GlobalAveragePooling2D, Dense, Dropout, Flatten,Conv2D,MaxPooling2D,Activation
from keras.models import Sequential
import cv2
import numpy
from keras.applications.mobilenet import MobileNet
from keras.layers import GlobalAveragePooling2D, Dense, Dropout, Flatten
from keras.models import Sequential
from keras.models import load_model
import json
import base64
import io
from django.http import JsonResponse
from rest_framework.views import APIView
import numpy as np
from PIL import Image
from django.http import HttpResponse


def stringToRGB(base64_string):
    imgdata = base64.b64decode(str(base64_string))
    image = Image.open(io.BytesIO(imgdata)).convert('L')
    return image



def arc(img) :
    
    m,n = 512,512 #image size
    channels = 3
    n_classes = 2
    Biopsy_model = Sequential()
    #model.add(BatchNormalization(input_shape = (m,n,channels)))
    Biopsy_model.add(Conv2D(32, (3,3),input_shape = (m,n,channels),padding='same'))
    Biopsy_model.add(MaxPooling2D(pool_size=(2,2)))
    Biopsy_model.add(Conv2D(32, (3,3),padding='same'))
    Biopsy_model.add(Activation('relu'))
    Biopsy_model.add(MaxPooling2D(pool_size=(2,2)))
    Biopsy_model.add(Conv2D(32, (3,3),padding='same'))
    Biopsy_model.add(Activation('relu'))
    Biopsy_model.add(MaxPooling2D(pool_size=(2,2)))
    Biopsy_model.add(Conv2D(32, (3,3),padding='same'))
    Biopsy_model.add(Activation('relu'))
    Biopsy_model.add(MaxPooling2D(pool_size=(2,2)))
    Biopsy_model.add(Conv2D(32, (3,3),padding='same'))
    Biopsy_model.add(Activation('relu'))
    Biopsy_model.add(MaxPooling2D(pool_size=(2,2)))
    Biopsy_model.add(Flatten())
    Biopsy_model.add(Dense(512))
    Biopsy_model.add(Activation('relu'))
    Biopsy_model.add(Dropout(0.2))
    Biopsy_model.add(Dense(128))
    Biopsy_model.add(Activation('relu'))
    Biopsy_model.add(Dropout(0.2))
    Biopsy_model.add(Dense(n_classes, activation='softmax'))
    Biopsy_model.compile(loss='categorical_crossentropy',
                optimizer='rmsprop',#optimizers.SGD(lr=0.01, decay=1e-3, momentum=0.9, nesterov=True),#'rmsprop',
                metrics=['acc'])
    Biopsy_model.load_weights('deseaseClassifier\\model\\fyp_model.h5')

   


    image1 = numpy.array(img)
    dims = (512,512)
    # image1.resize(256,256,1)
    image1 = Image.fromarray(image1)
    image1 = image1.resize(dims,Image.LANCZOS)
    image1 = np.array(image1).reshape(1,512,512,-1)
    # cv2.imshow('ResizedImage',image1.reshape(256,256,1))
    # cv2.waitKey()
    # prediction = ""
    prediction = Biopsy_model.predict_classes(image1,batch_size = 128,verbose = True)
    # prediction = Biopsy_model.predict(numpy.expand_dims(image1, axis=0))
    print(prediction)
    return prediction


def xray(image) :
    
    base_model = ResNet50(input_shape =  (256,256,1),include_top = False, weights = None)
    multi_disease_model = Sequential()
    multi_disease_model.add(base_model)
    multi_disease_model.add(GlobalAveragePooling2D())
    multi_disease_model.add(Dropout(0.5))
    multi_disease_model.add(Dense(512))
    multi_disease_model.add(Dropout(0.5))
    multi_disease_model.add(Dense(14, activation = 'sigmoid'))
    multi_disease_model.compile(optimizer = 'adam', loss = 'binary_crossentropy',
                            metrics = ['binary_accuracy', 'mae'])
    

    multi_disease_model.load_weights('deseaseClassifier\\model\\xray_class_weights.best.hdf5')

    # multi_disease_model = load_model('deseaseClassifier\\model\\MODEL (4).h5')
    # multi_disease_model.compile(optimizer = 'adam', loss = 'binary_crossentropy',
    #                         metrics = ['binary_accuracy', 'mae'])

    


    image1 = numpy.array(image)
    dims = (256,256)
    # image1.resize(256,256,1)
    image1 = Image.fromarray(image1)
    image1 = image1.resize(dims,Image.LANCZOS)
    image1 = np.array(image1).reshape(256,256,1)
    # cv2.imshow('ResizedImage',image1.reshape(256,256,1))
    # cv2.waitKey()
    # prediction = ""
    
    prediction = multi_disease_model.predict(numpy.expand_dims(image1, axis=0))
    return prediction
   
                
    








class call_biopsy_model(APIView):

    def post(self,request):
        if request.method == 'POST':
            # print(request.body)
            
            image = Image.open(request.FILES['myimage']).convert('RGB')

            # print(image.shape)
            
            

            # now comment.........
            # body_unicode = request.body.decode('utf-8')
            # body = json.loads(body_unicode)
            # b64string = body['base64Data']
            # print(b64string)
            # image = stringToRGB(b64string)
            #image = np.asarray(image)

            # now comment......



            #........ was comment out
            # image.astype('float16')
            # image = image/255
            
            
            # dims = (256,256)
            # image = np.reshape(image, (1,256,256,1))

            # image = cv2.resize(image, dims)

            # image = [image]  
            #........... was comment out
            prediction = arc(image)
            print(prediction)
            print("pre up")
            diseases = ['LUAD primary tumor ', 'Normal']
            list_pred = prediction.tolist()
            print(list_pred)
            diseases_predicted = []
            if (prediction == 1.0): 
                diseases_predicted.append(diseases[0])
            else:
                diseases_predicted.append(diseases[1])    


           
            
            # returning JSON response

            return JsonResponse({'Suspected':diseases_predicted}, safe = False)

            # t_y = prediction
            # sickest_idx = np.argsort(np.sum(t_y, 1)<1)
            # # fig, m_axs = plt.subplots(4, 2, figsize = (16, 32))
            # for (idx) in zip(sickest_idx):
            #     # c_ax.imshow(t_x[idx, :,:,0], cmap = 'bone')
            #     # stat_str = [n_class[:6] for n_class, n_score in zip(all_labels, 
            #     #                                                             t_y[idx]) 
            #     #                         if n_score>0.5]
            #     pred_str = ['%s:%2.0f%%' % (n_class, p_score*100)  for n_class, p_score in zip(all_labels, 
            #                                                                                 t_y[idx]) 
            #                             if (p_score>0.5)]
                # c_ax.set_title('Dx: '+', '.join(stat_str)+'\nPDx: '+', '.join(pred_str))

            # return JsonResponse({
            #     'Suspected':pred_str
            # },safe = False)

    def get(self, request):
        return JsonResponse({
            "status": 0,
            "message": "Method Not Allowed"
        }, safe = False)

class call_xray_model(APIView):


    def post(self,request):
        if request.method == 'POST':
            # print(request.body)
            
            image = Image.open(request.FILES['myimage']).convert('L')

            # print(image.shape)
            
            

            # now comment.........
            # body_unicode = request.body.decode('utf-8')
            # body = json.loads(body_unicode)
            # b64string = body['base64Data']
            # print(b64string)
            # image = stringToRGB(b64string)
            #image = np.asarray(image)

            # now comment......



            #........ was comment out
            # image.astype('float16')
            # image = image/255
            
            
            # dims = (256,256)
            # image = np.reshape(image, (1,256,256,1))

            # image = cv2.resize(image, dims)

            # image = [image]  
            #........... was comment out

            prediction = xray(image)
            diseases = ['Atelectasis', 'Cardiomegaly', 'Consolidation', 'Edema', 'Effusion', 'Emphysema', 'Fibrosis', 'Hernia', 'Infiltration', 'Mass', 'No Finding', 'Nodule', 'Pleural_Thickening', 'Pneumonia', 'Pneumothorax']
            list_pred = prediction.tolist()
            print(prediction)
            diseases_predicted = []
            print(image)
            for i , val in enumerate(list_pred[0]):
                if(val==1.0):
                    diseases_predicted.append(diseases[i])
                print(i, val)
            
            # returning JSON response

            return JsonResponse({'Suspected':diseases_predicted}, safe = False)
            

            # t_y = prediction
            # sickest_idx = np.argsort(np.sum(t_y, 1)<1)
            # # fig, m_axs = plt.subplots(4, 2, figsize = (16, 32))
            # for (idx) in zip(sickest_idx):
            #     # c_ax.imshow(t_x[idx, :,:,0], cmap = 'bone')
            #     # stat_str = [n_class[:6] for n_class, n_score in zip(all_labels, 
            #     #                                                             t_y[idx]) 
            #     #                         if n_score>0.5]
            #     pred_str = ['%s:%2.0f%%' % (n_class, p_score*100)  for n_class, p_score in zip(all_labels, 
            #                                                                                 t_y[idx]) 
            #                             if (p_score>0.5)]
                # c_ax.set_title('Dx: '+', '.join(stat_str)+'\nPDx: '+', '.join(pred_str))

            # return JsonResponse({
            #     'Suspected':pred_str
            # },safe = False)

    def get(self, request):
        return JsonResponse({
            "status": 0,
            "message": "Method Not Allowed"
        }, safe = False)