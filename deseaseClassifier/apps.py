from django.apps import AppConfig
from keras.models import load_model
from keras.optimizers import Adam
import tensorflow as tf
from keras.utils.data_utils import get_file
import keras


class DeseaseclassifierConfig(AppConfig):
    name = 'deseaseClassifier'

    # model = load_model("deseaseClassifier\\model\\")
    
    # # init = tf.global_variables_initializer()
    # # sess.run(init)
    # # keras.backend.clear_session()

    # graph = tf.get_default_graph()

    # INIT_LR = 1e-3
    # EPOCHS = 5
    # opt = Adam(lr=INIT_LR, decay=INIT_LR / EPOCHS)
    # model.compile(
    #     loss="categorical_crossentropy", 
    #     optimizer=opt,
    #     metrics=["accuracy"])